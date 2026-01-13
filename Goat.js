/**
 * @author NTKhang & Gemini Integration
 * Full Fixed Code: Handles both account.txt and account.dev.txt
 */

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

const axios = require("axios");
const fs = require("fs-extra");
const google = require("googleapis").google;
const nodemailer = require("nodemailer");
const express = require("express");
const { execSync } = require('child_process');
const path = require("path");
const log = require('./logger/log.js');

const app = express();
const port = process.env.PORT || 7177;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.env.BLUEBIRD_W_FORGOTTEN_RETURN = 0;

// ———————————————— DYNAMIC ACCOUNT FILE RESOLVER ———————————————— //
const { NODE_ENV } = process.env;

// Path gula thik kora
const dirConfig = path.normalize(`${__dirname}/config${NODE_ENV === 'development' ? '.dev.json' : '.json'}`);
const dirConfigCommands = path.normalize(`${__dirname}/configCommands${NODE_ENV === 'development' ? '.dev.json' : '.json'}`);

/**
 * Ei logic-ti check korbe: 
 * 1. Jodi account.dev.txt thake, seta nibe.
 * 2. Na thakle account.txt nibe.
 */
let dirAccount = path.join(__dirname, 'account.txt');
if (fs.existsSync(path.join(__dirname, 'account.dev.txt'))) {
    dirAccount = path.join(__dirname, 'account.dev.txt');
}

// ———————————————— VERSION BYPASS ———————————————— //
const pkgPath = path.join(__dirname, 'package.json');
if (fs.existsSync(pkgPath)) {
    try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        pkg.version = "2.1.0"; 
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    } catch (e) { }
}

function validJSON(pathDir) {
    try {
        if (!fs.existsSync(pathDir)) return false;
        execSync(`npx jsonlint "${pathDir}"`, { stdio: 'pipe' });
        return true;
    } catch (err) { return false; }
}

const config = fs.existsSync(dirConfig) ? require(dirConfig) : {};
const configCommands = fs.existsSync(dirConfigCommands) ? require(dirConfigCommands) : {};

// ———————————————— GLOBAL STATE ———————————————— //
global.GoatBot = {
    startTime: Date.now() - process.uptime() * 1000,
    commands: new Map(),
    eventCommands: new Map(),
    aliases: new Map(),
    onReply: new Map(),
    onReaction: new Map(),
    config,
    configCommands,
    envCommands: configCommands.envCommands || {},
    envEvents: configCommands.envEvents || {},
    envGlobal: configCommands.envGlobal || {},
    fcaApi: null,
    botID: null
};

global.db = { allThreadData: [], allUserData: [] };
global.client = { dirConfig, dirConfigCommands, dirAccount, database: {}, cache: {} };
global.utils = require("./utils.js");

// ———————————————— DASHBOARD & STATS API ———————————————— //

app.get('/', (req, res) => res.send("Bot Status: Active and Running"));

app.get("/api/stats", (req, res) => {
    const os = require('os');
    const uptime = process.uptime();
    res.json({
        activeAccountFile: path.basename(dirAccount),
        cpuUsage: (os.loadavg()[0] * 100 / (os.cpus().length || 1)).toFixed(2) + "%",
        ramUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
        totalThreads: global.db.allThreadData.length,
        totalUsers: global.db.allUserData.length
    });
});

app.post("/api/appstate", (req, res) => {
    const { appstate } = req.body;
    if (!appstate) return res.status(400).json({ error: "No AppState provided" });

    const data = typeof appstate === 'object' ? JSON.stringify(appstate, null, 2) : appstate;
    
    // Aktu agei resolve kora dirAccount path e save hobe
    fs.writeFile(dirAccount, data, 'utf8', (err) => {
        if (err) return res.status(500).json({ error: "Failed to save file" });
        res.json({ success: true, updatedFile: path.basename(dirAccount) });
        setTimeout(() => process.exit(2), 2000);
    });
});

// ———————————————— INITIALIZATION ———————————————— //

(async () => {
    console.log(global.utils.colors.cyan(`[ SYSTEM ] Using AppState file: ${path.basename(dirAccount)}`));

    // Mail Setup
    try {
        if (config.credentials?.gmailAccount?.email) {
            const { email, clientId, clientSecret, refreshToken } = config.credentials.gmailAccount;
            const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
            oauth2Client.setCredentials({ refresh_token: refreshToken });
            const accessToken = (await oauth2Client.getAccessToken()).token;

            global.utils.sendMail = async ({ to, subject, text, html }) => {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: { type: 'OAuth2', user: email, clientId, clientSecret, refreshToken, accessToken }
                });
                return await transporter.sendMail({ from: email, to, subject, text, html });
            };
        }
    } catch (e) { log.warn("MAIL", "Mail failed to init."); }

    // Start Express Server
    app.listen(port, "0.0.0.0", () => {
        log.success("SERVER", `Dashboard & Stats active on port ${port}`);
    });

    // Start Bot Logic
    require(`./bot/login/login${NODE_ENV === 'development' ? '.dev.js' : '.js'}`);
})();
