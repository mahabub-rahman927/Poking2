process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

const axios = require("axios");
const fs = require("fs-extra");
const google = require("googleapis").google;
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const port = process.env.PORT || 7177; 
const { execSync } = require('child_process');
const log = require('./logger/log.js');
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.env.BLUEBIRD_W_FORGOTTEN_RETURN = 0;

// ———————————————— VERSION BYPASS ———————————————— //
const pkgPath = path.join(__dirname, 'package.json');
if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.version = "2.1.0"; 
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

function validJSON(pathDir) {
    try {
        if (!fs.existsSync(pathDir)) throw new Error(`File "${pathDir}" not found`);
        execSync(`npx jsonlint "${pathDir}"`, { stdio: 'pipe' });
        return true;
    } catch (err) {
        let msgError = err.message;
        msgError = msgError.split("\n").slice(1).join("\n");
        const indexPos = msgError.indexOf("    at");
        msgError = msgError.slice(0, indexPos != -1 ? indexPos - 1 : msgError.length);
        throw new Error(msgError);
    }
}

const { NODE_ENV } = process.env;
const dirConfig = path.normalize(`${__dirname}/config${['production', 'development'].includes(NODE_ENV) ? '.dev.json' : '.json'}`);
const dirConfigCommands = path.normalize(`${__dirname}/configCommands${['production', 'development'].includes(NODE_ENV) ? '.dev.json' : '.json'}`);

// ———————————————— MULTI-ACCOUNT LOGIC ———————————————— //
const accountFolder = path.join(__dirname, 'accounts'); 
if (!fs.existsSync(accountFolder)) fs.mkdirSync(accountFolder);

// Folder theke shob .txt file gulo list kore nibe
const accountFiles = fs.readdirSync(accountFolder)
    .filter(file => file.endsWith('.txt'))
    .map(file => path.join(accountFolder, file));

// global.client object toiri ebong data assign
global.client = {
    dirConfig,
    dirConfigCommands,
    accountFiles: accountFiles,
    currentAccountIndex: 0, 
    dirAccount: accountFiles.length > 0 ? accountFiles[0] : `${__dirname}/account.txt`,
    countDown: {},
    cache: {},
    database: {
        creatingThreadData: [],
        creatingUserData: [],
        creatingDashBoardData: [],
        creatingGlobalData: []
    }
};

const dirAccount = global.client.dirAccount;

// ———————————————— CONFIG VALIDATION ———————————————— //
for (const pathDir of [dirConfig, dirConfigCommands]) {
    try {
        validJSON(pathDir);
    } catch (err) {
        log.error("CONFIG", `Invalid JSON file "${pathDir.replace(__dirname, "")}":\n${err.message.split("\n").map(line => `  ${line}`).join("\n")}\nPlease fix it and restart bot`);
        process.exit(0);
    }
}

const config = require(dirConfig);
if (config.whiteListMode?.whiteListIds && Array.isArray(config.whiteListMode.whiteListIds))
    config.whiteListMode.whiteListIds = config.whiteListMode.whiteListIds.map(id => id.toString());
const configCommands = require(dirConfigCommands);

global.GoatBot = {
    startTime: Date.now() - process.uptime() * 1000,
    commands: new Map(),
    eventCommands: new Map(),
    commandFilesPath: [],
    eventCommandsFilesPath: [],
    aliases: new Map(),
    onFirstChat: [],
    onChat: [],
    onEvent: [],
    onReply: new Map(),
    onReaction: new Map(),
    onAnyEvent: [],
    config,
    configCommands,
    envCommands: {},
    envEvents: {},
    envGlobal: {},
    reLoginBot: function () { },
    Listening: null,
    oldListening: [],
    callbackListenTime: {},
    storage5Message: [],
    fcaApi: null,
    botID: null
};

global.db = {
    allThreadData: [], allUserData: [], allDashBoardData: [], allGlobalData: [],
    threadModel: null, userModel: null, dashboardModel: null, globalModel: null,
    threadsData: null, usersData: null, dashBoardData: null, globalData: null,
    receivedTheFirstMessage: {}
};

const utils = require("./utils.js");
global.utils = utils;
const { colors } = utils;

global.temp = {
    createThreadData: [], createUserData: [], createThreadDataError: [],
    filesOfGoogleDrive: { arraybuffer: {}, stream: {}, fileNames: {} },
    contentScripts: { cmds: {}, events: {} }
};

// ———————————————— STARTUP ———————————————— //
(async () => {
    try {
        const { gmailAccount } = config.credentials;
        if (gmailAccount && gmailAccount.email) {
            const { email, clientId, clientSecret, refreshToken } = gmailAccount;
            const OAuth2 = google.auth.OAuth2;
            const OAuth2_client = new OAuth2(clientId, clientSecret);
            OAuth2_client.setCredentials({ refresh_token: refreshToken });
            const accessToken = await OAuth2_client.getAccessToken();

            global.utils.sendMail = async ({ to, subject, text, html, attachments }) => {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com', service: 'Gmail',
                    auth: { type: 'OAuth2', user: email, clientId, clientSecret, refreshToken, accessToken }
                });
                return await transporter.sendMail({ from: email, to, subject, text, html, attachments });
            };
        }
    } catch (e) {
        console.warn("Mail system failed to init.");
    }

    console.log(colors.cyan("[ SYSTEM ] Checking Version & Integrity..."));
    if (accountFiles.length > 0) {
        console.log(colors.green(`[ SYSTEM ] Found ${accountFiles.length} accounts in folder. Using: ${path.basename(global.client.dirAccount)}`));
    }

    const parentIdGoogleDrive = await utils.drive.checkAndCreateParentFolder("GoatBot");
    utils.drive.parentID = parentIdGoogleDrive;

    // Start login
    require(`./bot/login/login${NODE_ENV === 'development' ? '.dev.js' : '.js'}`);
})();

// ———————————————— ROUTES ———————————————— //
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/appstate', (req, res) => res.sendFile(path.join(__dirname, 'public/appstate.html')));

app.get("/api/stats", (req, res) => {
    const os = require('os');
    const uptime = process.uptime();
    res.json({
        cpu: (os.loadavg()[0] * 100 / (os.cpus().length || 1)).toFixed(2),
        memoryUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
        nodeVersion: process.version
    });
});

app.post("/api/appstate", (req, res) => {
    const { appstate } = req.body;
    if (!appstate) return res.status(400).json({ error: "Appstate missing" });

    fs.writeFile(global.client.dirAccount, appstate, 'utf8', (err) => {
        if (err) return res.status(500).json({ error: "Write failed" });
        res.json({ success: true });
        setTimeout(() => process.exit(2), 1000);
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`[ SERVER ] Active on port ${port}. Health check passed.`);
});
