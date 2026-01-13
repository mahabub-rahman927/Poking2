/**
 * @author NTKhang & Gemini Integration
 * Final Fixed Code for Render: Auto-fallback for Config & Account files
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

// ———————————————— DYNAMIC FILE RESOLVER ———————————————— //

// 1. Config File Resolver
let dirConfig = path.join(__dirname, 'config.json');
if (!fs.existsSync(dirConfig) && fs.existsSync(path.join(__dirname, 'config.dev.json'))) {
    dirConfig = path.join(__dirname, 'config.dev.json');
}

// 2. ConfigCommands File Resolver
let dirConfigCommands = path.join(__dirname, 'configCommands.json');
if (!fs.existsSync(dirConfigCommands) && fs.existsSync(path.join(__dirname, 'configCommands.dev.json'))) {
    dirConfigCommands = path.join(__dirname, 'configCommands.dev.json');
}

// 3. Account File Resolver
let dirAccount = path.join(__dirname, 'account.txt');
if (fs.existsSync(path.join(__dirname, 'account.dev.txt'))) {
    dirAccount = path.join(__dirname, 'account.dev.txt');
}

// ———————————————— SAFE CONFIG LOADING ———————————————— //
let config = {};
let configCommands = {};

try {
    if (fs.existsSync(dirConfig)) {
        config = JSON.parse(fs.readFileSync(dirConfig, 'utf8'));
    }
    if (fs.existsSync(dirConfigCommands)) {
        configCommands = JSON.parse(fs.readFileSync(dirConfigCommands, 'utf8'));
    }
} catch (e) {
    console.error("[ ERROR ] Config parsing failed. Check your JSON format.");
}

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
app.get('/', (req, res) => res.send("GoatBot is Active on Render!"));

app.get("/api/stats", (req, res) => {
    const os = require('os');
    res.json({
        usingConfig: path.basename(dirConfig),
        usingAccount: path.basename(dirAccount),
        memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        uptime: Math.floor(process.uptime() / 60) + " mins",
        threads: global.db.allThreadData.length
    });
});

app.post("/api/appstate", (req, res) => {
    const { appstate } = req.body;
    if (!appstate) return res.status(400).send("No AppState");
    const data = typeof appstate === 'object' ? JSON.stringify(appstate, null, 2) : appstate;
    fs.writeFileSync(dirAccount, data, 'utf8');
    res.json({ success: true, file: path.basename(dirAccount) });
    setTimeout(() => process.exit(2), 2000);
});

// ———————————————— INITIALIZATION ———————————————— //
(async () => {
    console.log(`[ SYSTEM ] Config: ${path.basename(dirConfig)}`);
    console.log(`[ SYSTEM ] Account: ${path.basename(dirAccount)}`);

    // Gmail Crash Protection
    try {
        if (config?.credentials?.gmailAccount?.email) {
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
    } catch (e) {
        console.warn("[ MAIL ] Gmail system skipped (Config missing or invalid).");
    }

    // Server Listen
    app.listen(port, "0.0.0.0", () => {
        console.log(`[ SERVER ] Dashboard active on port ${port}`);
    });

    // Login logic
    const { NODE_ENV } = process.env;
    const loginFile = `./bot/login/login${NODE_ENV === 'development' ? '.dev.js' : '.js'}`;
    
    try {
        if (fs.existsSync(path.join(__dirname, loginFile))) {
            require(loginFile);
        } else {
            require('./bot/login/login.js');
        }
    } catch (err) {
        console.error("[ LOGIN ] Could not start login process:", err.message);
    }
})();
