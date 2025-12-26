const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync
} = require("fs-extra");
const path = require("path");
const exec = (_0x3e5d30, _0x2d2e06) => new Promise((_0x2ec7b0, _0x320ff6) => {
  require("child_process").exec(_0x3e5d30, _0x2d2e06, (_0xdcff60, _0x68e42f) => {
    if (_0xdcff60) {
      return _0x320ff6(_0xdcff60);
    }
    _0x2ec7b0(_0x68e42f);
  });
});
const {
  log,
  loading,
  getText,
  colors,
  removeHomeDir
} = global.utils;
const {
  GoatBot
} = global;
const {
  configCommands
} = GoatBot;
const regExpCheckPackage = /require(\s+|)\((\s+|)[`'"]([^`'"]+)[`'"](\s+|)\)/g;
const packageAlready = [];
const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let count = 0;
module.exports = async function (_0x423297, _0xce5d8c, _0x543fe1, _0x40a3c5, _0x2ee1a4, _0x8c6cf0, _0xed1903, _0x4ee66f, _0x12fdad, _0x3d33a0) {
  const _0x459c96 = await _0x12fdad.get("setalias", "data", []);
  if (_0x459c96) {
    for (const _0x5d1c86 of _0x459c96) {
      const {
        aliases: _0xf54298,
        commandName: _0x2cabd8
      } = _0x5d1c86;
      for (const _0x455db4 of _0xf54298) if (GoatBot.aliases.has(_0x455db4)) {
        throw new Error("Alias \"" + _0x455db4 + "\" already exists in command \"" + _0x2cabd8 + "\"");
      } else {
        GoatBot.aliases.set(_0x455db4, _0x2cabd8);
      }
    }
  }
  const _0x8d8a9b = ["cmds", "events"];
  let _0x2b5a43;
  let _0x15552a;
  let _0x15df96;
  for (const _0x50f23c of _0x8d8a9b) {
    const _0x5cbdca = _0x50f23c == "cmds" ? _0x3d33a0("MAHABUB_BRO.. LOAD COMMANDS") : _0x3d33a0("MAHABUB_BRO.. COMMANDS EVENT");
    console.log(colors.hex("#f5ab00")(_0x5cbdca));
    if (_0x50f23c == "cmds") {
      _0x2b5a43 = "command";
      _0x15df96 = "envCommands";
      _0x15552a = "commands";
    } else if (_0x50f23c == "events") {
      _0x2b5a43 = "event command";
      _0x15df96 = "envEvents";
      _0x15552a = "eventCommands";
    }
    const _0x1c21fe = path.normalize(process.cwd() + ("/scripts/" + _0x50f23c));
    const _0x384f2d = readdirSync(_0x1c21fe).filter(_0x33580f => _0x33580f.endsWith(".js") && !_0x33580f.endsWith("eg.js") && (process.env.NODE_ENV == "development" ? true : !_0x33580f.match(/(dev)\.js$/g)) && !configCommands[_0x50f23c == "cmds" ? "commandUnload" : "commandEventUnload"]?.["includes"](_0x33580f));
    const _0x43777d = [];
    let _0x41c646 = 0;
    for (const _0x2673d8 of _0x384f2d) {
      const _0x28fcc0 = path.normalize(_0x1c21fe + '/' + _0x2673d8);
      try {
        const _0x4f08bf = readFileSync(_0x28fcc0, "utf8");
        let _0x5ba544 = _0x4f08bf.match(regExpCheckPackage);
        if (_0x5ba544) {
          _0x5ba544 = _0x5ba544.map(_0x1494b2 => _0x1494b2.match(/[`'"]([^`'"]+)[`'"]/)[1]).filter(_0x3901b4 => _0x3901b4.indexOf('/') !== 0 && _0x3901b4.indexOf('./') !== 0 && _0x3901b4.indexOf("../") !== 0 && _0x3901b4.indexOf(__dirname) !== 0);
          for (let _0x2cf529 of _0x5ba544) {
            if (_0x2cf529.startsWith('@')) {
              _0x2cf529 = _0x2cf529.split('/').slice(0, 2).join('/');
            } else {
              _0x2cf529 = _0x2cf529.split('/')[0];
            }
            if (!packageAlready.includes(_0x2cf529)) {
              packageAlready.push(_0x2cf529);
              if (!existsSync(process.cwd() + "/node_modules/" + _0x2cf529)) {
                const _0x4d8c99 = setInterval(() => {
                  loading.info("MAHABUB_BRO.. PACKAGE", spinner[count % spinner.length] + " Installing package " + colors.yellow(_0x2cf529) + " for " + _0x2b5a43 + " " + colors.yellow(_0x2673d8));
                  count++;
                }, 80);
                try {
                  await exec("npm install " + _0x2cf529 + " --" + (_0x28fcc0.endsWith(".dev.js") ? "no-save" : "save"));
                  clearInterval(_0x4d8c99);
                  process.stderr.write("\r[K");
                  console.log(colors.green('✔') + " installed package " + _0x2cf529 + " successfully");
                } catch (_0x22338b) {
                  clearInterval(_0x4d8c99);
                  process.stderr.write("\r[K");
                  console.log(colors.red('✖') + " installed package " + _0x2cf529 + " failed");
                  throw new Error("Can't install package " + _0x2cf529);
                }
              }
            }
          }
        }
        global.temp.contentScripts[_0x50f23c][_0x2673d8] = _0x4f08bf;
        const _0x54f1f9 = require(_0x28fcc0);
        _0x54f1f9.location = _0x28fcc0;
        const _0x1d1388 = _0x54f1f9.config;
        const _0x200277 = _0x1d1388.name;
        if (!_0x1d1388) {
          throw new Error("config of " + _0x2b5a43 + " undefined");
        }
        if (!_0x1d1388.category) {
          throw new Error("category of " + _0x2b5a43 + " undefined");
        }
        if (!_0x200277) {
          throw new Error("name of " + _0x2b5a43 + " undefined");
        }
        if (!_0x54f1f9.onStart) {
          throw new Error("onStart of " + _0x2b5a43 + " undefined");
        }
        if (typeof _0x54f1f9.onStart !== "function") {
          throw new Error("onStart of " + _0x2b5a43 + " must be a function");
        }
        if (GoatBot[_0x15552a].has(_0x200277)) {
          throw new Error(_0x2b5a43 + " \"" + _0x200277 + "\" already exists with file \"" + removeHomeDir(GoatBot[_0x15552a].get(_0x200277).location || '') + "\"");
        }
        const {
          onFirstChat: _0x4b0a00,
          onChat: _0x27fc0a,
          onLoad: _0x458b96,
          onEvent: _0x305b83,
          onAnyEvent: _0x3f4398
        } = _0x54f1f9;
        const {
          envGlobal: _0x50378a,
          envConfig: _0x5474bb
        } = _0x1d1388;
        const {
          aliases: _0x59626b
        } = _0x1d1388;
        const _0x3a9cf2 = [];
        if (_0x59626b) {
          if (!Array.isArray(_0x59626b)) {
            throw new Error("The value of \"config.aliases\" must be array!");
          }
          for (const _0xc02e3b of _0x59626b) {
            if (_0x59626b.filter(_0x359866 => _0x359866 == _0xc02e3b).length > 1) {
              throw new Error("alias \"" + _0xc02e3b + "\" duplicate in " + _0x2b5a43 + " \"" + _0x200277 + "\" with file \"" + removeHomeDir(_0x28fcc0) + "\"");
            }
            if (GoatBot.aliases.has(_0xc02e3b)) {
              throw new Error("alias \"" + _0xc02e3b + "\" already exists in " + _0x2b5a43 + " \"" + GoatBot.aliases.get(_0xc02e3b) + "\" with file \"" + removeHomeDir(GoatBot[_0x15552a].get(GoatBot.aliases.get(_0xc02e3b))?.["location"] || '') + "\"");
            }
            _0x3a9cf2.push(_0xc02e3b);
          }
          for (const _0x26988a of _0x3a9cf2) GoatBot.aliases.set(_0x26988a, _0x200277);
        }
        if (_0x50378a) {
          if (typeof _0x50378a != "object" || typeof _0x50378a == "object" && Array.isArray(_0x50378a)) {
            throw new Error("the value of \"envGlobal\" must be object");
          }
          for (const _0x209099 in _0x50378a) {
            if (!configCommands.envGlobal[_0x209099]) {
              configCommands.envGlobal[_0x209099] = _0x50378a[_0x209099];
            } else {
              const _0x576658 = readFileSync(_0x28fcc0, "utf-8").replace(_0x50378a[_0x209099], configCommands.envGlobal[_0x209099]);
              writeFileSync(_0x28fcc0, _0x576658);
            }
          }
        }
        if (_0x5474bb) {
          if (typeof _0x5474bb != "object" || typeof _0x5474bb == "object" && Array.isArray(_0x5474bb)) {
            throw new Error("The value of \"envConfig\" must be object");
          }
          if (!configCommands[_0x15df96]) {
            configCommands[_0x15df96] = {};
          }
          if (!configCommands[_0x15df96][_0x200277]) {
            configCommands[_0x15df96][_0x200277] = {};
          }
          for (const [_0x40526b, _0x29b1a8] of Object.entries(_0x5474bb)) {
            if (!configCommands[_0x15df96][_0x200277][_0x40526b]) {
              configCommands[_0x15df96][_0x200277][_0x40526b] = _0x29b1a8;
            } else {
              const _0x2106d6 = readFileSync(_0x28fcc0, "utf-8").replace(_0x29b1a8, configCommands[_0x15df96][_0x200277][_0x40526b]);
              writeFileSync(_0x28fcc0, _0x2106d6);
            }
          }
        }
        if (_0x458b96) {
          if (typeof _0x458b96 != "function") {
            throw new Error("The value of \"onLoad\" must be function");
          }
          await _0x458b96({
            'api': _0x423297,
            'threadModel': _0xce5d8c,
            'userModel': _0x543fe1,
            'dashBoardModel': _0x40a3c5,
            'globalModel': _0x2ee1a4,
            'threadsData': _0x8c6cf0,
            'usersData': _0xed1903,
            'dashBoardData': _0x4ee66f,
            'globalData': _0x12fdad
          });
        }
        if (_0x27fc0a) {
          GoatBot.onChat.push(_0x200277);
        }
        if (_0x4b0a00) {
          GoatBot.onFirstChat.push({
            'commandName': _0x200277,
            'threadIDsChattedFirstTime': []
          });
        }
        if (_0x305b83) {
          GoatBot.onEvent.push(_0x200277);
        }
        if (_0x3f4398) {
          GoatBot.onAnyEvent.push(_0x200277);
        }
        GoatBot[_0x15552a].set(_0x200277.toLowerCase(), _0x54f1f9);
        _0x41c646++;
        global.GoatBot[_0x50f23c == "cmds" ? "commandFilesPath" : "eventCommandsFilesPath"].push({
          'filePath': path.normalize(_0x28fcc0),
          'commandName': [_0x200277, ..._0x3a9cf2]
        });
      } catch (_0x5326e4) {
        _0x43777d.push({
          'name': _0x2673d8,
          'error': _0x5326e4
        });
      }
      loading.info("MAHABUB_BRO.. LOADED", '' + colors.green('' + _0x41c646) + (_0x43777d.length ? ", " + colors.red('' + _0x43777d.length) : ''));
    }
    console.log("\r");
    if (_0x43777d.length > 0) {
      log.err("MAHABUB_BRO.. LOADED", getText("loadScripts", "loadScriptsError", colors.yellow(_0x2b5a43)));
      for (const _0x4c6b29 of _0x43777d) console.log(" " + colors.red("✖ " + _0x4c6b29.name) + ": " + _0x4c6b29.error.message + "\n", _0x4c6b29.error);
    }
  }
};
