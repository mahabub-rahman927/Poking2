process.stdout.write("]2;Goat Bot V2 - Made by NTKhang Fixed by ArYAN\\");
function decode(_0x266863) {
  _0x266863 = Buffer.from(_0x266863, "hex").toString("utf-8");
  _0x266863 = Buffer.from(_0x266863, "hex").toString("utf-8");
  _0x266863 = Buffer.from(_0x266863, "base64").toString("utf-8");
  return _0x266863;
}
const gradient = require("gradient-string");
const axios = require("axios");
const path = require("path");
const readline = require("readline");
const fs = require("fs-extra");
const toptp = require("totp-generator");
const login = require(process.cwd() + "/fb-chat-api");
const qr = new (require("qrcode-reader"))();
const Canvas = require("canvas");
const https = require("https");
const repliedMessages = new Map();

function safeReply(threadID, messageID, text, api) {
    const key = `${threadID}_${messageID}`;
    if (repliedMessages.has(key)) return; // already replied
    api.sendMessage(text, threadID);
    repliedMessages.set(key, true);
    // auto clean after 5 minutes
    setTimeout(() => repliedMessages.delete(key), 5 * 60 * 1000);
}
async function getName(_0x255149) {
  try {
    const _0x15e68c = await axios.post("https://www.facebook.com/api/graphql/?q=" + ("node(" + _0x255149 + "){name}"));
    return _0x15e68c.data[_0x255149].name;
  } catch (_0x33517b) {
    return null;
  }
}
function compareVersion(_0x2b7aab, _0x5d3f77) {
  const _0x512b3b = _0x2b7aab.split('.');
  const _0x3e5f1b = _0x5d3f77.split('.');
  for (let _0x5cadc2 = 0; _0x5cadc2 < 3; _0x5cadc2++) {
    if (parseInt(_0x512b3b[_0x5cadc2]) > parseInt(_0x3e5f1b[_0x5cadc2])) {
      return 1;
    }
    if (parseInt(_0x512b3b[_0x5cadc2]) < parseInt(_0x3e5f1b[_0x5cadc2])) {
      return -1;
    }
  }
  return 0;
}
const {
  writeFileSync,
  readFileSync,
  existsSync,
  watch
} = require("fs-extra");
const handlerWhenListenHasError = require("./handlerWhenListenHasError.js");
const checkLiveCookie = require("./checkLiveCookie.js");
const {
  callbackListenTime,
  storage5Message
} = global.GoatBot;
const {
  log,
  logColor,
  getPrefix,
  createOraDots,
  jsonStringifyColor,
  getText,
  convertTime,
  colors,
  randomString
} = global.utils;
const sleep = _0x54dc56 => new Promise(_0x5b9a6d => setTimeout(_0x5b9a6d, _0x54dc56));
const currentVersion = require(process.cwd() + "/package.json").version;
function centerText(_0x579e65, _0x51f02e) {
  const _0x3c271d = process.stdout.columns;
  const _0x2940c0 = Math.floor((_0x3c271d - (_0x51f02e || _0x579e65.length)) / 2);
  const _0x266b3b = _0x3c271d - _0x2940c0 - (_0x51f02e || _0x579e65.length);
  const _0x5de934 = " ".repeat(_0x2940c0 > 0 ? _0x2940c0 : 0) + _0x579e65 + " ".repeat(_0x266b3b > 0 ? _0x266b3b : 0);
  console.log(_0x5de934);
}
const titles = [["██████╗  ██████╗  █████╗ ████████╗    ██╗   ██╗██████╗", "██╔════╝ ██╔═══██╗██╔══██╗╚══██╔══╝    ██║   ██║╚════██╗", "██║  ███╗██║   ██║███████║   ██║       ██║   ██║ █████╔╝", "██║   ██║██║   ██║██╔══██║   ██║       ╚██╗ ██╔╝██╔═══╝", "╚██████╔╝╚██████╔╝██║  ██║   ██║        ╚████╔╝ ███████╗", "╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝         ╚═══╝  ╚══════╝"], ["█▀▀ █▀█ ▄▀█ ▀█▀  █▄▄ █▀█ ▀█▀  █░█ ▀█", "█▄█ █▄█ █▀█ ░█░  █▄█ █▄█ ░█░  ▀▄▀ █▄"], ["G O A T B O T  V 2 @" + currentVersion], ["GOATBOT V2"]];
const maxWidth = process.stdout.columns;
const title = maxWidth > 58 ? titles[0] : maxWidth > 36 ? titles[1] : maxWidth > 26 ? titles[2] : titles[3];
console.log(gradient("#f5af19", "#f12711")(createLine(null, true)));
console.log();
for (const text of title) {
  const textColor = gradient("#FA8BFF", "#2BD2FF", "#2BFF88")(text);
  centerText(textColor, text.length);
}
let subTitle = "GoatBot V2@" + currentVersion + "- A simple Bot chat messenger use personal account";
const subTitleArray = [];
if (subTitle.length > maxWidth) {
  while (subTitle.length > maxWidth) {
    let lastSpace = subTitle.slice(0, maxWidth).lastIndexOf(" ");
    lastSpace = lastSpace == -1 ? maxWidth : lastSpace;
    subTitleArray.push(subTitle.slice(0, lastSpace).trim());
    subTitle = subTitle.slice(lastSpace).trim();
  }
  if (subTitle) {
    subTitleArray.push(subTitle);
  } else {
    '';
  }
} else {
  subTitleArray.push(subTitle);
}
for (const t of subTitleArray) {
  const textColor2 = gradient("#9F98E8", "#AFF6CF")(t);
  centerText(textColor2, t.length);
}
centerText(gradient("#9F98E8", "#AFF6CF")("Created by NTKhang + ArYAN  with ♡"), "Created by NTKhang + ArYAN  with ♡".length);
centerText(gradient("#9F98E8", "#AFF6CF")("Source code: https://github.com/ARYAN-BOT-404/GOATBOT-V2"), "Source code: https://github.com/ARYAN-BOT-404/GOATBOT-V2".length);
centerText(gradient("#f5af19", "#f12711")("ALL VERSIONS NOT RELEASED HERE ARE FAKE"), "ALL VERSIONS NOT RELEASED HERE ARE FAKE".length);
let widthConsole = process.stdout.columns;
if (widthConsole > 50) {
  widthConsole = 50;
}
function createLine(_0x4d84ec, _0x4edbdd = false) {
  if (!_0x4d84ec) {
    return Array(_0x4edbdd ? process.stdout.columns : widthConsole).fill('─').join('');
  } else {
    _0x4d84ec = " " + _0x4d84ec.trim() + " ";
    const _0x280ab5 = _0x4d84ec.length;
    const _0xa15ce = _0x4edbdd ? process.stdout.columns - _0x280ab5 : widthConsole - _0x280ab5;
    let _0x48e186 = Math.floor(_0xa15ce / 2);
    if (_0x48e186 < 0 || isNaN(_0x48e186)) {
      _0x48e186 = 0;
    }
    const _0x3d964b = Array(_0x48e186).fill('─').join('');
    return _0x3d964b + _0x4d84ec + _0x3d964b;
  }
}
const character = createLine();
const clearLines = _0x456b45 => {
  for (let _0x5bdf72 = 0; _0x5bdf72 < _0x456b45; _0x5bdf72++) {
    const _0x4af265 = _0x5bdf72 === 0 ? null : -1;
    process.stdout.moveCursor(0, _0x4af265);
    process.stdout.clearLine(1);
  }
  process.stdout.cursorTo(0);
  process.stdout.write('');
};
async function input(_0x2174b8, _0x392154 = false) {
  const _0x222ef8 = readline.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  if (_0x392154) {
    _0x222ef8.input.on("keypress", function () {
      const _0x781a38 = _0x222ef8.line.length;
      readline.moveCursor(_0x222ef8.output, -_0x781a38, 0);
      readline.clearLine(_0x222ef8.output, 1);
      for (let _0x21bd81 = 0; _0x21bd81 < _0x781a38; _0x21bd81++) {
        _0x222ef8.output.write('*');
      }
    });
  }
  return new Promise(_0x46adb4 => _0x222ef8.question(_0x2174b8, _0x583c02 => {
    _0x222ef8.close();
    _0x46adb4(_0x583c02);
  }));
}
qr.readQrCode = async function (_0x5d8c92) {
  const _0x40f68a = await Canvas.loadImage(_0x5d8c92);
  const _0x594340 = Canvas.createCanvas(_0x40f68a.width, _0x40f68a.height);
  const _0x39cdab = _0x594340.getContext('2d');
  _0x39cdab.drawImage(_0x40f68a, 0, 0);
  const _0x21e263 = _0x39cdab.getImageData(0, 0, _0x40f68a.width, _0x40f68a.height);
  let _0x460eb8;
  qr.callback = function (_0xe2b788, _0x5a554b) {
    if (_0xe2b788) {
      throw _0xe2b788;
    }
    _0x460eb8 = _0x5a554b;
  };
  qr.decode(_0x21e263);
  return _0x460eb8.result;
};
const {
  dirAccount
} = global.client;
const {
  facebookAccount
} = global.GoatBot.config;
function responseUptimeSuccess(_0x4bbf62, _0x100c74) {
  _0x100c74.type("json").send({
    'status': "success",
    'uptime': process.uptime(),
    'unit': "seconds"
  });
}
function responseUptimeError(_0x166295, _0x1c9614) {
  _0x1c9614.status(500).type("json").send({
    'status': "error",
    'uptime': process.uptime(),
    'statusAccountBot': global.statusAccountBot
  });
}
function checkAndTrimString(_0x4f318c) {
  if (typeof _0x4f318c == "string") {
    return _0x4f318c.trim();
  }
  return _0x4f318c;
}
function filterKeysAppState(_0x499d7b) {
  return _0x499d7b.filter(_0x5c5e01 => ["c_user", 'xs', "datr", 'fr', 'sb', "i_user"].includes(_0x5c5e01.key));
}
global.responseUptimeCurrent = responseUptimeSuccess;
global.responseUptimeSuccess = responseUptimeSuccess;
global.responseUptimeError = responseUptimeError;
global.statusAccountBot = "good";
let changeFbStateByCode = false;
let latestChangeContentAccount = fs.statSync(dirAccount).mtimeMs;
let dashBoardIsRunning = false;
async function getAppStateFromEmail(_0x9e303f = {
  '_start': () => {},
  '_stop': () => {}
}, _0x581ea5) {
  const {
    email: _0x3f40b2,
    password: _0x31db7f,
    userAgent: _0x325b96,
    proxy: _0x32e0ad
  } = _0x581ea5;
  const _0x377a03 = require(process.env.NODE_ENV === "development" ? "./getFbstate1.dev.js" : "./getFbstate1.js");
  let _0x87f544;
  let _0x5350c3;
  try {
    try {
      _0x5350c3 = await _0x377a03(checkAndTrimString(_0x3f40b2), checkAndTrimString(_0x31db7f), _0x325b96, _0x32e0ad);
      _0x9e303f._stop();
    } catch (_0x5f0499) {
      if (_0x5f0499["continue"]) {
        let _0x3072af = 0;
        let _0x408976 = false;
        await async function _0x1f1bb6(_0x111e1a) {
          if (_0x111e1a && _0x408976) {
            _0x9e303f._stop();
            log.error("LOGIN FACEBOOK", _0x111e1a);
            process.exit();
          }
          if (_0x111e1a) {
            _0x9e303f._stop();
            log.warn("LOGIN FACEBOOK", _0x111e1a);
          }
          if (_0x581ea5["2FASecret"] && _0x3072af == 0) {
            switch ([".png", ".jpg", ".jpeg"].some(_0x174f0e => _0x581ea5["2FASecret"].endsWith(_0x174f0e))) {
              case true:
                _0x87f544 = (await qr.readQrCode(process.cwd() + '/' + _0x581ea5["2FASecret"])).replace(/.*secret=(.*)&digits.*/g, '$1');
                break;
              case false:
                _0x87f544 = _0x581ea5["2FASecret"];
                break;
            }
          } else {
            _0x9e303f._stop();
            _0x87f544 = await input("> Enter 2FA code or secret: ");
            readline.moveCursor(process.stderr, 0, -1);
            readline.clearScreenDown(process.stderr);
          }
          const _0x47a84b = isNaN(_0x87f544) ? toptp(_0x87f544.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/[đ|Đ]/g, _0x34ef86 => _0x34ef86 == 'đ' ? 'd' : 'D').replace(/\(|\)|\,/g, '').replace(/ /g, '')) : _0x87f544;
          _0x9e303f._start();
          try {
            _0x5350c3 = JSON.parse(JSON.stringify(await _0x5f0499["continue"](_0x47a84b)));
            _0x5350c3 = _0x5350c3.map(_0x16ef00 => ({
              'key': _0x16ef00.key,
              'value': _0x16ef00.value,
              'domain': _0x16ef00.domain,
              'path': _0x16ef00.path,
              'hostOnly': _0x16ef00.hostOnly,
              'creation': _0x16ef00.creation,
              'lastAccessed': _0x16ef00.lastAccessed
            })).filter(_0x570307 => _0x570307.key);
            _0x9e303f._stop();
          } catch (_0x2547b8) {
            _0x3072af++;
            if (!_0x2547b8["continue"]) {
              _0x408976 = true;
            }
            await _0x1f1bb6(_0x2547b8.message);
          }
        }(_0x5f0499.message);
      } else {
        throw _0x5f0499;
      }
    }
  } catch (_0x1b733e) {
    const _0x311a96 = require(process.env.NODE_ENV === "development" ? "./loginMbasic.dev.js" : "./loginMbasic.js");
    if (_0x581ea5["2FASecret"]) {
      switch ([".png", ".jpg", ".jpeg"].some(_0x550361 => _0x581ea5["2FASecret"].endsWith(_0x550361))) {
        case true:
          _0x87f544 = (await qr.readQrCode(process.cwd() + '/' + _0x581ea5["2FASecret"])).replace(/.*secret=(.*)&digits.*/g, '$1');
          break;
        case false:
          _0x87f544 = _0x581ea5["2FASecret"];
          break;
      }
    }
    _0x5350c3 = await _0x311a96({
      'email': _0x3f40b2,
      'pass': _0x31db7f,
      'twoFactorSecretOrCode': _0x87f544,
      'userAgent': _0x325b96,
      'proxy': _0x32e0ad
    });
    _0x5350c3 = _0x5350c3.map(_0x4b5a64 => {
      _0x4b5a64.key = _0x4b5a64.name;
      delete _0x4b5a64.name;
      return _0x4b5a64;
    });
    _0x5350c3 = filterKeysAppState(_0x5350c3);
  }
  global.GoatBot.config.facebookAccount["2FASecret"] = _0x87f544 || '';
  writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
  return _0x5350c3;
}
function isNetScapeCookie(_0x3d0dc1) {
  if (typeof _0x3d0dc1 !== "string") {
    return false;
  }
  return /(.+)\t(1|TRUE|true)\t([\w\/.-]*)\t(1|TRUE|true)\t\d+\t([\w-]+)\t(.+)/i.test(_0x3d0dc1);
}
function netScapeToCookies(_0x137dab) {
  const _0xf1df80 = [];
  const _0x41cf1b = _0x137dab.split("\n");
  _0x41cf1b.forEach(_0x2c7d29 => {
    if (_0x2c7d29.trim().startsWith('#')) {
      return;
    }
    const _0x4bade0 = _0x2c7d29.split("\t").map(_0x1f8665 => _0x1f8665.trim()).filter(_0x13dbe2 => _0x13dbe2.length > 0);
    if (_0x4bade0.length < 7) {
      return;
    }
    const _0x31dc35 = {
      'key': _0x4bade0[5],
      'value': _0x4bade0[6],
      'domain': _0x4bade0[0],
      'path': _0x4bade0[2],
      'hostOnly': _0x4bade0[1] === "TRUE",
      'creation': new Date(_0x4bade0[4] * 1000).toISOString(),
      'lastAccessed': new Date().toISOString()
    };
    _0xf1df80.push(_0x31dc35);
  });
  return _0xf1df80;
}
function pushI_user(_0x27bddd, _0x373f34) {
  _0x27bddd.push({
    'key': "i_user",
    'value': _0x373f34 || facebookAccount.i_user,
    'domain': "facebook.com",
    'path': '/',
    'hostOnly': false,
    'creation': new Date().toISOString(),
    'lastAccessed': new Date().toISOString()
  });
  return _0x27bddd;
}
let spin;
async function getAppStateToLogin(_0x1bccfa) {
  let _0x357416 = [];
  if (_0x1bccfa) {
    return await getAppStateFromEmail(undefined, facebookAccount);
  }
  if (!existsSync(dirAccount)) {
    return log.error("LOGIN FACEBOOK", getText("login", "notFoundDirAccount", colors.green(dirAccount)));
  }
  const _0xc7911c = readFileSync(dirAccount, "utf8");
  try {
    const _0x52ead7 = _0xc7911c.replace(/\|/g, "\n").split("\n").map(_0x36e49a => _0x36e49a.trim()).filter(_0x2d66a9 => _0x2d66a9);
    if (_0xc7911c.startsWith("EAAAA")) {
      try {
        spin = createOraDots(getText("login", "loginToken"));
        spin._start();
        _0x357416 = await require("./getFbstate.js")(_0xc7911c);
      } catch (_0x439214) {
        _0x439214.name = "TOKEN_ERROR";
        throw _0x439214;
      }
    } else {
      if (_0xc7911c.match(/^(?:\s*\w+\s*=\s*[^;]*;?)+/)) {
        spin = createOraDots(getText("login", "loginCookieString"));
        spin._start();
        _0x357416 = _0xc7911c.split(';').map(_0x3e7f3d => {
          const [_0x2381e9, _0x2a0e39] = _0x3e7f3d.split('=');
          return {
            'key': (_0x2381e9 || '').trim(),
            'value': (_0x2a0e39 || '').trim(),
            'domain': "facebook.com",
            'path': '/',
            'hostOnly': true,
            'creation': new Date().toISOString(),
            'lastAccessed': new Date().toISOString()
          };
        }).filter(_0x212dc9 => _0x212dc9.key && _0x212dc9.value && _0x212dc9.key != "x-referer");
      } else {
        if (isNetScapeCookie(_0xc7911c)) {
          spin = createOraDots(getText("login", "loginCookieNetscape"));
          spin._start();
          _0x357416 = netScapeToCookies(_0xc7911c);
        } else {
          if ((_0x52ead7.length == 2 || _0x52ead7.length == 3) && !_0x52ead7.slice(0, 2).map(_0x27ca93 => _0x27ca93.trim()).some(_0x5df68c => _0x5df68c.includes(" "))) {
            global.GoatBot.config.facebookAccount.email = _0x52ead7[0];
            global.GoatBot.config.facebookAccount.password = _0x52ead7[1];
            if (_0x52ead7[2]) {
              const _0x202a5c = _0x52ead7[2].replace(/ /g, '');
              global.GoatBot.config.facebookAccount["2FASecret"] = _0x202a5c;
            }
            writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
          } else {
            try {
              spin = createOraDots(getText("login", "loginCookieArray"));
              spin._start();
              _0x357416 = JSON.parse(_0xc7911c);
            } catch (_0x3ad619) {
              const _0x3ddb7b = new Error(path.basename(dirAccount) + " is invalid");
              _0x3ddb7b.name = "ACCOUNT_ERROR";
              throw _0x3ddb7b;
            }
            if (_0x357416.some(_0x55db3d => _0x55db3d.name)) {
              _0x357416 = _0x357416.map(_0x5344df => {
                _0x5344df.key = _0x5344df.name;
                delete _0x5344df.name;
                return _0x5344df;
              });
            } else {
              if (!_0x357416.some(_0x5876dd => _0x5876dd.key)) {
                const _0x37cb65 = new Error(path.basename(dirAccount) + " is invalid");
                _0x37cb65.name = "ACCOUNT_ERROR";
                throw _0x37cb65;
              }
            }
            _0x357416 = _0x357416.map(_0x1b0ed7 => ({
              ..._0x1b0ed7,
              'domain': "facebook.com",
              'path': '/',
              'hostOnly': false,
              'creation': new Date().toISOString(),
              'lastAccessed': new Date().toISOString()
            })).filter(_0x34ec68 => _0x34ec68.key && _0x34ec68.value && _0x34ec68.key != "x-referer");
          }
        }
      }
    }
  } catch (_0x2991b8) {
    if (spin) {
      spin._stop();
    }
    let {
      email: _0x52453c,
      password: _0x25d4fa
    } = facebookAccount;
    if (_0x2991b8.name === "TOKEN_ERROR") {
      log.err("LOGIN FACEBOOK", getText("login", "tokenError", colors.green("EAAAA..."), colors.green(dirAccount)));
    } else {
      if (_0x2991b8.name === "COOKIE_INVALID") {
        log.err("LOGIN FACEBOOK", getText("login", "cookieError"));
      }
    }
    if (!_0x52453c || !_0x25d4fa) {
      log.warn("LOGIN FACEBOOK", getText("login", "cannotFindAccount"));
      const _0x3bd058 = readline.createInterface({
        'input': process.stdin,
        'output': process.stdout
      });
      const _0xd8bf6e = [getText("login", "chooseAccount"), getText("login", "chooseToken"), getText("login", "chooseCookieString"), getText("login", "chooseCookieArray")];
      let _0x529b35 = 0;
      await new Promise(_0x54ce91 => {
        function _0x308242() {
          _0x3bd058.output.write("\r" + _0xd8bf6e.map((_0x49ae72, _0x295e23) => _0x295e23 === _0x529b35 ? colors.blueBright("> (" + (_0x295e23 + 1) + ") " + _0x49ae72) : "  (" + (_0x295e23 + 1) + ") " + _0x49ae72).join("\n") + "");
          _0x3bd058.write("[?25l");
        }
        _0x3bd058.input.on("keypress", (_0x42f8cc, _0x116d06) => {
          if (_0x116d06.name === 'up') {
            _0x529b35 = (_0x529b35 - 1 + _0xd8bf6e.length) % _0xd8bf6e.length;
          } else {
            if (_0x116d06.name === "down") {
              _0x529b35 = (_0x529b35 + 1) % _0xd8bf6e.length;
            } else {
              if (!isNaN(_0x116d06.name)) {
                const _0x3afdc2 = parseInt(_0x116d06.name);
                if (_0x3afdc2 >= 0 && _0x3afdc2 <= _0xd8bf6e.length) {
                  _0x529b35 = _0x3afdc2 - 1;
                }
                process.stdout.write("[1D");
              } else {
                if (_0x116d06.name === "enter" || _0x116d06.name === "return") {
                  _0x3bd058.input.removeAllListeners("keypress");
                  _0x3bd058.close();
                  clearLines(_0xd8bf6e.length + 1);
                  _0x308242();
                  _0x54ce91();
                } else {
                  process.stdout.write("[1D");
                }
              }
            }
          }
          clearLines(_0xd8bf6e.length);
          _0x308242();
        });
        _0x308242();
      });
      _0x3bd058.write("[?25h\n");
      clearLines(_0xd8bf6e.length + 1);
      log.info("LOGIN FACEBOOK", getText("login", "loginWith", _0xd8bf6e[_0x529b35]));
      if (_0x529b35 == 0) {
        _0x52453c = await input(getText("login", "inputEmail") + " ");
        _0x25d4fa = await input(getText("login", "inputPassword") + " ", true);
        const _0x48ce4b = await input(getText("login", "input2FA") + " ");
        facebookAccount.email = _0x52453c || '';
        facebookAccount.password = _0x25d4fa || '';
        facebookAccount["2FASecret"] = _0x48ce4b || '';
        writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      } else {
        if (_0x529b35 == 1) {
          const _0x2e694f = await input(getText("login", "inputToken") + " ");
          writeFileSync(global.client.dirAccount, _0x2e694f);
        } else {
          if (_0x529b35 == 2) {
            const _0x4c7659 = await input(getText("login", "inputCookieString") + " ");
            writeFileSync(global.client.dirAccount, _0x4c7659);
          } else {
            const _0x458376 = await input(getText("login", "inputCookieArray") + " ");
            writeFileSync(global.client.dirAccount, JSON.stringify(JSON.parse(_0x458376), null, 2));
          }
        }
      }
      return await getAppStateToLogin();
    }
    log.info("LOGIN FACEBOOK", getText("login", "loginPassword"));
    log.info("ACCOUNT INFO", "Email: " + facebookAccount.email + ", I_User: " + (facebookAccount.i_user || "(empty)"));
    spin = createOraDots(getText("login", "loginPassword"));
    spin._start();
    try {
      _0x357416 = await getAppStateFromEmail(spin, facebookAccount);
      spin._stop();
    } catch (_0x3bb53d) {
      spin._stop();
      log.err("LOGIN FACEBOOK", getText("login", "loginError"), _0x3bb53d.message, _0x3bb53d);
      process.exit();
    }
  }
  return _0x357416;
}
function stopListening(_0x2cf510) {
  _0x2cf510 = _0x2cf510 || Object.keys(callbackListenTime).pop();
  return new Promise(_0x30b5ca => {
    if (!global.GoatBot.fcaApi.stopListening?.(() => {
      if (callbackListenTime[_0x2cf510]) {
        callbackListenTime[_0x2cf510] = () => {};
      }
      _0x30b5ca();
    })) {
      _0x30b5ca();
    }
  });
}
async function startBot(_0x141d2f) {
  console.log(colors.hex("#f5ab00")(createLine("START LOGGING IN", true)));
  const _0x59dd64 = require("../../package.json").version;
  const _0x3e111e = (await axios.get("https://raw.githubusercontent.com/ntkhang03/Goat-Bot-V2-Storage/main/tooOldVersions.txt")).data || "0.0.0";
  if ([-1, 0].includes(compareVersion(_0x59dd64, _0x3e111e))) {
    log.err("VERSION", getText("version", "tooOldVersion", colors.yellowBright("node update")));
    process.exit();
  }
  if (global.GoatBot.Listening) {
    await stopListening();
  }
  log.info("LOGIN FACEBOOK", getText("login", "currentlyLogged"));
  let _0x5f5cca = await getAppStateToLogin(_0x141d2f);
  changeFbStateByCode = true;
  _0x5f5cca = filterKeysAppState(_0x5f5cca);
  writeFileSync(dirAccount, JSON.stringify(_0x5f5cca, null, 2));
  setTimeout(() => changeFbStateByCode = false, 1000);
  (function _0x23fdc7(_0x221140) {
    global.GoatBot.commands = new Map();
    global.GoatBot.eventCommands = new Map();
    global.GoatBot.aliases = new Map();
    global.GoatBot.onChat = [];
    global.GoatBot.onEvent = [];
    global.GoatBot.onReply = new Map();
    global.GoatBot.onReaction = new Map();
    clearInterval(global.intervalRestartListenMqtt);
    delete global.intervalRestartListenMqtt;
    if (facebookAccount.i_user) {
      pushI_user(_0x221140, facebookAccount.i_user);
    }
    let _0x2602ee = false;
    login({
      'appState': _0x221140
    }, global.GoatBot.config.optionsFca, async function (_0x3ac270, _0x1a7537) {
      if (!isNaN(facebookAccount.intervalGetNewCookie) && facebookAccount.intervalGetNewCookie > 0) {
        if (facebookAccount.email && facebookAccount.password) {
          spin?.["_stop"]();
          log.info("REFRESH COOKIE", getText("login", "refreshCookieAfter", convertTime(facebookAccount.intervalGetNewCookie * 60 * 1000, true)));
          setTimeout(async function _0x57ead2() {
            try {
              log.info("REFRESH COOKIE", getText("login", "refreshCookie"));
              const _0x3e651c = await getAppStateFromEmail(undefined, facebookAccount);
              if (facebookAccount.i_user) {
                pushI_user(_0x3e651c, facebookAccount.i_user);
              }
              changeFbStateByCode = true;
              writeFileSync(dirAccount, JSON.stringify(filterKeysAppState(_0x3e651c), null, 2));
              setTimeout(() => changeFbStateByCode = false, 1000);
              log.info("REFRESH COOKIE", getText("login", "refreshCookieSuccess"));
              return startBot(_0x3e651c);
            } catch (_0x47d16f) {
              log.err("REFRESH COOKIE", getText("login", "refreshCookieError"), _0x47d16f.message, _0x47d16f);
              setTimeout(_0x57ead2, facebookAccount.intervalGetNewCookie * 60 * 1000);
            }
          }, facebookAccount.intervalGetNewCookie * 60 * 1000);
        } else {
          spin?.["_stop"]();
          log.warn("REFRESH COOKIE", getText("login", "refreshCookieWarning"));
        }
      }
      if (spin) {
        spin._stop();
      } else {
        null;
      }
      if (_0x3ac270) {
        log.err("LOGIN FACEBOOK", getText("login", "loginError"), _0x3ac270);
        global.statusAccountBot = "can't login";
        if (facebookAccount.email && facebookAccount.password) {
          return startBot(true);
        }
        if (global.GoatBot.config.dashBoard?.["enable"] == true) {
          try {
            await require("../../dashboard/app.js")(null);
            log.info("DASHBOARD", getText("login", "openDashboardSuccess"));
          } catch (_0x384082) {
            log.err("DASHBOARD", getText("login", "openDashboardError"), _0x384082);
          }
          return;
        } else {
          process.exit();
        }
      }
      global.GoatBot.fcaApi = _0x1a7537;
      global.GoatBot.botID = _0x1a7537.getCurrentUserID();
      log.info("LOGIN FACEBOOK", getText("login", "loginSuccess"));
      let _0x61eac0 = false;
      global.botID = _0x1a7537.getCurrentUserID();
      logColor("#f5ab00", createLine("BOT INFO"));
      log.info("NODE VERSION", process.version);
      log.info("PROJECT VERSION", _0x59dd64);
      log.info("BOT ID", global.botID + " - " + (await getName(global.botID)));
      log.info("PREFIX", global.GoatBot.config.prefix);
      log.info("LANGUAGE", global.GoatBot.config.language);
      log.info("BOT NICK NAME", global.GoatBot.config.nickNameBot || "GOAT BOT");
      let _0x145ebf;
      try {
        const _0x1174f6 = await axios.get("https://raw.githubusercontent.com/Savage-Army/gban/refs/heads/main/gban.json");
        _0x145ebf = _0x1174f6.data;
        const _0x44aeff = _0x1a7537.getCurrentUserID();
        if (_0x145ebf.hasOwnProperty(_0x44aeff)) {
          if (!_0x145ebf[_0x44aeff].toDate) {
            log.err("GBAN", getText("login", "gbanMessage", _0x145ebf[_0x44aeff].date, _0x145ebf[_0x44aeff].reason, _0x145ebf[_0x44aeff].date));
            _0x61eac0 = true;
          } else {
            const _0x27aa77 = new Date((await axios.get("http://worldtimeapi.org/api/timezone/UTC")).data.utc_datetime).getTime();
            if (_0x27aa77 < new Date(_0x145ebf[_0x44aeff].date).getTime()) {
              log.err("GBAN", getText("login", "gbanMessage", _0x145ebf[_0x44aeff].date, _0x145ebf[_0x44aeff].reason, _0x145ebf[_0x44aeff].date, _0x145ebf[_0x44aeff].toDate));
              _0x61eac0 = true;
            }
          }
        }
        for (const _0x4d3a32 of global.GoatBot.config.adminBot) {
          if (_0x145ebf.hasOwnProperty(_0x4d3a32)) {
            if (!_0x145ebf[_0x4d3a32].toDate) {
              log.err("GBAN", getText("login", "gbanMessage", _0x145ebf[_0x4d3a32].date, _0x145ebf[_0x4d3a32].reason, _0x145ebf[_0x4d3a32].date));
              _0x61eac0 = true;
            } else {
              const _0x46f0ce = new Date((await axios.get("http://worldtimeapi.org/api/timezone/UTC")).data.utc_datetime).getTime();
              if (_0x46f0ce < new Date(_0x145ebf[_0x4d3a32].date).getTime()) {
                log.err("GBAN", getText("login", "gbanMessage", _0x145ebf[_0x4d3a32].date, _0x145ebf[_0x4d3a32].reason, _0x145ebf[_0x4d3a32].date, _0x145ebf[_0x4d3a32].toDate));
                _0x61eac0 = true;
              }
            }
          }
        }
        if (_0x61eac0 == true) {
          process.exit();
        }
      } catch (_0x92e973) {
        console.log(_0x92e973);
        log.err("GBAN", getText("login", "checkGbanError"));
        process.exit();
      }
      let _0x1548d1;
      try {
        const _0x2c1b20 = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-ARYAN/public/refs/heads/main/notification.txt");
        _0x1548d1 = _0x2c1b20.data;
      } catch (_0x315bd8) {
        log.err("ERROR", "Can't get notifications data");
        process.exit();
      }
      if (global.GoatBot.config.autoRefreshFbstate == true) {
        changeFbStateByCode = true;
        try {
          writeFileSync(dirAccount, JSON.stringify(filterKeysAppState(_0x1a7537.getAppState()), null, 2));
          log.info("REFRESH FBSTATE", getText("login", "refreshFbstateSuccess", path.basename(dirAccount)));
        } catch (_0x231cb0) {
          log.warn("REFRESH FBSTATE", getText("login", "refreshFbstateError", path.basename(dirAccount)), _0x231cb0);
        }
        setTimeout(() => changeFbStateByCode = false, 1000);
      }
      if (_0x61eac0 == true) {
        log.err("GBAN", getText("login", "youAreBanned"));
        process.exit();
      }
      const {
        threadModel: _0x4d5ba1,
        userModel: _0x5dca33,
        dashBoardModel: _0x1b13cf,
        globalModel: _0x4b5213,
        threadsData: _0x424f16,
        usersData: _0x7160f2,
        dashBoardData: _0x5c0680,
        globalData: _0x12e437,
        sequelize: _0x5d6f05
      } = await require(process.env.NODE_ENV === "development" ? "./loadData.dev.js" : "./loadData.js")(_0x1a7537, createLine);
      await require("../custom.js")({
        'api': _0x1a7537,
        'threadModel': _0x4d5ba1,
        'userModel': _0x5dca33,
        'dashBoardModel': _0x1b13cf,
        'globalModel': _0x4b5213,
        'threadsData': _0x424f16,
        'usersData': _0x7160f2,
        'dashBoardData': _0x5c0680,
        'globalData': _0x12e437,
        'getText': getText
      });
      await require(process.env.NODE_ENV === "development" ? "./loadScripts.dev.js" : "./loadScripts.js")(_0x1a7537, _0x4d5ba1, _0x5dca33, _0x1b13cf, _0x4b5213, _0x424f16, _0x7160f2, _0x5c0680, _0x12e437, createLine);
      if (global.GoatBot.config.autoLoadScripts?.["enable"] == true) {
        const _0x21fbb4 = global.GoatBot.config.autoLoadScripts.ignoreCmds?.["replace"](/[ ,]+/g, " ")["trim"]()["split"](" ") || [];
        const _0x220682 = global.GoatBot.config.autoLoadScripts.ignoreEvents?.["replace"](/[ ,]+/g, " ")["trim"]()["split"](" ") || [];
        watch(process.cwd() + "/scripts/cmds", async (_0x59101b, _0x52762c) => {
          if (_0x52762c.endsWith(".js")) {
            if (_0x21fbb4.includes(_0x52762c) || _0x52762c.endsWith(".eg.js")) {
              return;
            }
            if ((_0x59101b == "change" || _0x59101b == "rename") && existsSync(process.cwd() + "/scripts/cmds/" + _0x52762c)) {
              try {
                const _0x56d45d = global.temp.contentScripts.cmds[_0x52762c] || '';
                const _0x1196a5 = readFileSync(process.cwd() + "/scripts/cmds/" + _0x52762c, "utf-8");
                if (_0x56d45d == _0x1196a5) {
                  return;
                }
                global.temp.contentScripts.cmds[_0x52762c] = _0x1196a5;
                _0x52762c = _0x52762c.replace(".js", '');
                const _0x48a968 = global.utils.loadScripts("cmds", _0x52762c, log, global.GoatBot.configCommands, _0x1a7537, _0x4d5ba1, _0x5dca33, _0x1b13cf, _0x4b5213, _0x424f16, _0x7160f2, _0x5c0680, _0x12e437);
                if (_0x48a968.status == "success") {
                  log.master("AUTO LOAD SCRIPTS", "Command " + _0x52762c + ".js (" + _0x48a968.command.config.name + ") has been reloaded");
                } else {
                  log.err("AUTO LOAD SCRIPTS", "Error when reload command " + _0x52762c + ".js", _0x48a968.error);
                }
              } catch (_0x2da878) {
                log.err("AUTO LOAD SCRIPTS", "Error when reload command " + _0x52762c + ".js", _0x2da878);
              }
            }
          }
        });
        watch(process.cwd() + "/scripts/events", async (_0x3e151c, _0x16affb) => {
          if (_0x16affb.endsWith(".js")) {
            if (_0x220682.includes(_0x16affb) || _0x16affb.endsWith(".eg.js")) {
              return;
            }
            if ((_0x3e151c == "change" || _0x3e151c == "rename") && existsSync(process.cwd() + "/scripts/events/" + _0x16affb)) {
              try {
                const _0x2e4465 = global.temp.contentScripts.events[_0x16affb] || '';
                const _0x30974a = readFileSync(process.cwd() + "/scripts/events/" + _0x16affb, "utf-8");
                if (_0x2e4465 == _0x30974a) {
                  return;
                }
                global.temp.contentScripts.events[_0x16affb] = _0x30974a;
                _0x16affb = _0x16affb.replace(".js", '');
                const _0xc5afe4 = global.utils.loadScripts("events", _0x16affb, log, global.GoatBot.configCommands, _0x1a7537, _0x4d5ba1, _0x5dca33, _0x1b13cf, _0x4b5213, _0x424f16, _0x7160f2, _0x5c0680, _0x12e437);
                if (_0xc5afe4.status == "success") {
                  log.master("AUTO LOAD SCRIPTS", "Event " + _0x16affb + ".js (" + _0xc5afe4.command.config.name + ") has been reloaded");
                } else {
                  log.err("AUTO LOAD SCRIPTS", "Error when reload event " + _0x16affb + ".js", _0xc5afe4.error);
                }
              } catch (_0x368508) {
                log.err("AUTO LOAD SCRIPTS", "Error when reload event " + _0x16affb + ".js", _0x368508);
              }
            }
          }
        });
      }
      if (global.GoatBot.config.dashBoard?.["enable"] == true && dashBoardIsRunning == false) {
        logColor("#f5ab00", createLine("DASHBOARD"));
        try {
          await require("../../dashboard/app.js")(_0x1a7537);
          log.info("DASHBOARD", getText("login", "openDashboardSuccess"));
          dashBoardIsRunning = true;
        } catch (_0x27227f) {
          log.err("DASHBOARD", getText("login", "openDashboardError"), _0x27227f);
        }
      }
      logColor("#f5ab00", character);
      let _0x3e6c72 = 0;
      const _0x49af3e = global.GoatBot.config.adminBot.filter(_0x1dd600 => !isNaN(_0x1dd600)).map(_0x249b41 => _0x249b41 = _0x249b41.toString());
      for (const _0xd76885 of _0x49af3e) {
        try {
          const _0x34c372 = await _0x7160f2.getName(_0xd76885);
          log.master("ADMINBOT", '[' + ++_0x3e6c72 + "] " + _0xd76885 + " | " + _0x34c372);
        } catch (_0x52e5f0) {
          log.master("ADMINBOT", '[' + ++_0x3e6c72 + "] " + _0xd76885);
        }
      }
      log.master("NOTIFICATION", (_0x1548d1 || '').trim());
      log.master("SUCCESS", getText("login", "runBot"));
      log.master("LOAD TIME", '' + convertTime(Date.now() - global.GoatBot.startTime));
      logColor("#f5ab00", createLine("COPYRIGHT"));
      console.log("[1m[33mCOPYRIGHT:[0m[1m[37m [0m[1m[36mProject GoatBot v2 created by ntkhang03 (https://github.com/ntkhang03), please do not sell this source code or claim it as your own. Thank you![0m");
      logColor("#f5ab00", character);
      global.GoatBot.config.adminBot = _0x49af3e;
      writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      writeFileSync(global.client.dirConfigCommands, JSON.stringify(global.GoatBot.configCommands, null, 2));
      const {
        restartListenMqtt: _0xef1e41
      } = global.GoatBot.config;
      let _0x37178f = false;
      async function _0x34c580(_0x107a61, _0x2a2fea) {
        if (_0x107a61) {
          global.responseUptimeCurrent = responseUptimeError;
          if (_0x107a61.error == "Not logged in" || _0x107a61.error == "Not logged in." || _0x107a61.error == "Connection refused: Server unavailable") {
            log.err("NOT LOGGEG IN", getText("login", "notLoggedIn"), _0x107a61);
            global.responseUptimeCurrent = responseUptimeError;
            global.statusAccountBot = "can't login";
            if (!_0x2602ee) {
              await handlerWhenListenHasError({
                'api': _0x1a7537,
                'threadModel': _0x4d5ba1,
                'userModel': _0x5dca33,
                'dashBoardModel': _0x1b13cf,
                'globalModel': _0x4b5213,
                'threadsData': _0x424f16,
                'usersData': _0x7160f2,
                'dashBoardData': _0x5c0680,
                'globalData': _0x12e437,
                'error': _0x107a61
              });
              _0x2602ee = true;
            }
            if (global.GoatBot.config.autoRestartWhenListenMqttError) {
              process.exit(2);
            } else {
              const _0x56ec33 = Object.keys(callbackListenTime).pop();
              if (callbackListenTime[_0x56ec33]) {
                callbackListenTime[_0x56ec33] = () => {};
              }
              const _0x350c4d = _0x221140.map(_0x1ef8d6 => _0x1ef8d6.key + '=' + _0x1ef8d6.value).join("; ");
              let _0x3b2a11 = 5;
              const _0x3170d5 = createOraDots(getText("login", "retryCheckLiveCookie", _0x3b2a11));
              const _0x140ec4 = setInterval(() => {
                _0x3b2a11--;
                if (_0x3b2a11 == 0) {
                  _0x3b2a11 = 5;
                }
                _0x3170d5.text = getText("login", "retryCheckLiveCookie", _0x3b2a11);
              }, 1000);
              if (_0x37178f == false) {
                _0x37178f = true;
                const _0x42eab8 = setInterval(async () => {
                  const _0x61866 = await checkLiveCookie(_0x350c4d, facebookAccount.userAgent);
                  if (_0x61866) {
                    clearInterval(_0x42eab8);
                    clearInterval(_0x140ec4);
                    _0x37178f = false;
                    const _0x54536b = Date.now();
                    _0x2602ee = false;
                    global.GoatBot.Listening = _0x1a7537.listenMqtt(_0x54934e(_0x54536b));
                  }
                }, 5000);
              }
            }
            return;
          } else {
            if (_0x107a61 == "Connection closed." || _0x107a61 == "Connection closed by user.") {
              return;
            } else {
              await handlerWhenListenHasError({
                'api': _0x1a7537,
                'threadModel': _0x4d5ba1,
                'userModel': _0x5dca33,
                'dashBoardModel': _0x1b13cf,
                'globalModel': _0x4b5213,
                'threadsData': _0x424f16,
                'usersData': _0x7160f2,
                'dashBoardData': _0x5c0680,
                'globalData': _0x12e437,
                'error': _0x107a61
              });
              return log.err("LISTEN_MQTT", getText("login", "callBackError"), _0x107a61);
            }
          }
        }
        global.responseUptimeCurrent = responseUptimeSuccess;
        global.statusAccountBot = "good";
        const _0x2b8a0b = global.GoatBot.config.logEvents;
        if (_0x2602ee == true) {
          _0x2602ee = false;
        }
        if (global.GoatBot.config.whiteListMode?.["enable"] == true && global.GoatBot.config.whiteListModeThread?.["enable"] == true && !global.GoatBot.config.adminBot.includes(_0x2a2fea.senderID)) {
          if (!global.GoatBot.config.whiteListMode.whiteListIds.includes(_0x2a2fea.senderID) && !global.GoatBot.config.whiteListModeThread.whiteListThreadIds.includes(_0x2a2fea.threadID) && !global.GoatBot.config.adminBot.includes(_0x2a2fea.senderID)) {
            return;
          }
        } else {
          if (global.GoatBot.config.whiteListMode?.["enable"] == true && !global.GoatBot.config.whiteListMode.whiteListIds.includes(_0x2a2fea.senderID) && !global.GoatBot.config.adminBot.includes(_0x2a2fea.senderID)) {
            return;
          } else {
            if (global.GoatBot.config.whiteListModeThread?.["enable"] == true && !global.GoatBot.config.whiteListModeThread.whiteListThreadIds.includes(_0x2a2fea.threadID) && !global.GoatBot.config.adminBot.includes(_0x2a2fea.senderID)) {
              return;
            }
          }
        }
        if (_0x2a2fea.messageID && _0x2a2fea.type == "message") {
          if (storage5Message.includes(_0x2a2fea.messageID)) {
            Object.keys(callbackListenTime).slice(0, -1).forEach(_0x4a1446 => {
              callbackListenTime[_0x4a1446] = () => {};
            });
          } else {
            storage5Message.push(_0x2a2fea.messageID);
          }
          if (storage5Message.length > 5) {
            storage5Message.shift();
          }
        }
        if (_0x2b8a0b.disableAll === false && _0x2b8a0b[_0x2a2fea.type] !== false) {
          const _0x377fdd = [...(_0x2a2fea.participantIDs || [])];
          if (_0x2a2fea.participantIDs) {
            _0x2a2fea.participantIDs = "Array(" + _0x2a2fea.participantIDs.length + ')';
          }
          console.log(colors.green((_0x2a2fea.type || '').toUpperCase() + ':'), jsonStringifyColor(_0x2a2fea, null, 2));
          if (_0x2a2fea.participantIDs) {
            _0x2a2fea.participantIDs = _0x377fdd;
          }
        }
        if (_0x2a2fea.senderID && _0x145ebf[_0x2a2fea.senderID] || _0x2a2fea.userID && _0x145ebf[_0x2a2fea.userID]) {
          if (_0x2a2fea.body && _0x2a2fea.threadID) {
            const _0x5f3269 = getPrefix(_0x2a2fea.threadID);
            if (_0x2a2fea.body.startsWith(_0x5f3269)) {
              return _0x1a7537.sendMessage(getText("login", "userBanned"), _0x2a2fea.threadID);
            }
            return;
          } else {
            return;
          }
        }
        const _0x326fb5 = require("../handler/handlerAction.js")(_0x1a7537, _0x4d5ba1, _0x5dca33, _0x1b13cf, _0x4b5213, _0x7160f2, _0x424f16, _0x5c0680, _0x12e437);
        if (_0x61eac0 === false) {
          _0x326fb5(_0x2a2fea);
        } else {
          return log.err("GBAN", getText("login", "youAreBanned"));
        }
      }
      function _0x54934e(_0x511171) {
        _0x511171 = randomString(10) + (_0x511171 || Date.now());
        callbackListenTime[_0x511171] = _0x34c580;
        return function (_0x49e2a0, _0x1a23b3) {
          callbackListenTime[_0x511171](_0x49e2a0, _0x1a23b3);
        };
      }
      await stopListening();
      global.GoatBot.Listening = _0x1a7537.listenMqtt(_0x54934e());
      global.GoatBot.callBackListen = _0x34c580;
      if (global.GoatBot.config.serverUptime.enable == true && !global.GoatBot.config.dashBoard?.["enable"] && !global.serverUptimeRunning) {
        const _0x11816e = require("http");
        const _0x3ecc5c = require("express");
        const _0x248a13 = _0x3ecc5c();
        const _0x55511c = _0x11816e.createServer(_0x248a13);
        const {
          data: _0x40c2e1
        } = await axios.get("https://raw.githubusercontent.com/ntkhang03/resources-goat-bot/master/homepage/home.html");
        const _0x3facb3 = global.GoatBot.config.dashBoard?.["port"] || !isNaN(global.GoatBot.config.serverUptime.port) && global.GoatBot.config.serverUptime.port || 3001;
        _0x248a13.get('/', (_0x37b3e4, _0x3decdb) => _0x3decdb.send(_0x40c2e1));
        _0x248a13.get("/uptime", global.responseUptimeCurrent);
        let _0x39ed70;
        try {
          _0x39ed70 = "https://" + (process.env.REPL_OWNER ? process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + ".repl.co" : process.env.API_SERVER_EXTERNAL == "https://api.glitch.com" ? process.env.PROJECT_DOMAIN + ".glitch.me" : "localhost:" + _0x3facb3);
          if (_0x39ed70.includes("localhost")) {
            _0x39ed70 = _0x39ed70.replace("https", "http");
          }
          await _0x55511c.listen(_0x3facb3);
          log.info("UPTIME", getText("login", "openServerUptimeSuccess", _0x39ed70));
          if (global.GoatBot.config.serverUptime.socket?.["enable"] == true) {
            require("./socketIO.js")(_0x55511c);
          }
          global.serverUptimeRunning = true;
        } catch (_0x3ff5d7) {
          log.err("UPTIME", getText("login", "openServerUptimeError"), _0x3ff5d7);
        }
      }
      if (_0xef1e41.enable == true) {
        if (_0xef1e41.logNoti == true) {
          log.info("LISTEN_MQTT", getText("login", "restartListenMessage", convertTime(_0xef1e41.timeRestart, true)));
          log.info("BOT_STARTED", getText("login", "startBotSuccess"));
          logColor("#f5ab00", character);
        }
        const _0x483831 = setInterval(async function () {
          if (_0xef1e41.enable == false) {
            clearInterval(_0x483831);
            return log.warn("LISTEN_MQTT", getText("login", "stopRestartListenMessage"));
          }
          try {
            await stopListening();
            await sleep(1000);
            global.GoatBot.Listening = _0x1a7537.listenMqtt(_0x54934e());
            log.info("LISTEN_MQTT", getText("login", "restartListenMessage2"));
          } catch (_0x12b9e4) {
            log.err("LISTEN_MQTT", getText("login", "restartListenMessageError"), _0x12b9e4);
          }
        }, _0xef1e41.timeRestart);
        global.intervalRestartListenMqtt = _0x483831;
      }
      require("../autoUptime.js");
    });
  })(_0x5f5cca);
  if (global.GoatBot.config.autoReloginWhenChangeAccount) {
    setTimeout(function () {
      watch(dirAccount, async _0x472188 => {
        if (_0x472188 == "change" && changeFbStateByCode == false && latestChangeContentAccount != fs.statSync(dirAccount).mtimeMs) {
          clearInterval(global.intervalRestartListenMqtt);
          global.compulsoryStopLisening = true;
          latestChangeContentAccount = fs.statSync(dirAccount).mtimeMs;
          startBot();
        }
      });
    }, 10000);
  }
}
global.GoatBot.reLoginBot = startBot;
startBot();
