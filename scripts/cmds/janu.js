const axios = require("axios");
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => "https://mahabubxnirob-simisimi.onrender.com";

module.exports.config = {
  name: "janu",
  aliases: ["jan"],
  version: "1.0.9",
  author: "MR᭄﹅ MAHABUB﹅ メꪜ",
  countDown: 0,
  role: 0,
  description: "Strict Janu Simisimi Chat",
  category: "chat",
  guide: { en: "Type 'Janu' or use {pn} [text]" }
};

const saveUnknownQuestion = (text) => {
  const tempDir = path.join(process.cwd(), "temp");
  const filePath = path.join(tempDir, "q.json");

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  let data = {};
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      data = raw ? JSON.parse(raw) : {};
    } catch (e) { data = {}; }
  }

  const key = "question" + (Object.keys(data).length + 1);
  data[key] = text;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const askAPI = async (text) => {
  try {
    const res = await axios.get(`${await baseApiUrl()}/ask?q=${encodeURIComponent(text)}`);
    return res.data?.reply || "আমি এটা জানি না 🥲";
  } catch (err) {
    return "আমি এটা জানি না 🥲";
  }
};

module.exports.onStart = async ({ api, event, args }) => {
  try {
    const text = args.join(" ");
    if (!text) return api.sendMessage("🫶 Janu ki bolbo?", event.threadID, event.messageID);

    const reply = await askAPI(text);
    api.sendMessage(reply + " ​​", event.threadID, event.messageID);

    if (reply === "আমি এটা জানি না 🥲") saveUnknownQuestion(text);
  } catch (error) {
    console.error(error);
  }
};

module.exports.onChat = async ({ api, event }) => {
  try {
    if (!event.body) return;
    const body = event.body.trim().toLowerCase();

    if (body === "janu" || body === "jan") {
      return api.sendMessage("🫶 Janu ki bolbo?", event.threadID, event.messageID);
    }

    if (event.messageReply && event.messageReply.senderID === api.getCurrentUserID()) {
      const botMsg = event.messageReply.body;
      const isTrigger = botMsg.includes("🫶 Janu ki bolbo?") || botMsg.endsWith(" ​​");

      if (isTrigger) {
        const reply = await askAPI(event.body);
        api.sendMessage(reply + " ​​", event.threadID, event.messageID);
        if (reply === "আমি এটা জানি না 🥲") saveUnknownQuestion(event.body);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
