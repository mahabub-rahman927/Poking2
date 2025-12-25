const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "album",
    version: "1.7",
    role: 0,
    author: "MAHABUB", //⚠️ Do not change the author name, otherwise the file will not work!
    category: "media",
    guide: {
      en: "{p}{n} [cartoon/sad/islamic/funny/anime/...]",
    },
  },

  onStart: async function ({ api, event, args }) {
    const obfuscatedAuthor = String.fromCharCode(77, 65, 72, 65, 66, 85, 66);
    if (this.config.author !== obfuscatedAuthor) {
      return api.sendMessage(
        "You are not authorized to change the author name.\n\nPlease fix the author name to use this command.",
        event.threadID,
        event.messageID
      );
    }

    if (!args[0]) {
      api.setMessageReaction("😽", event.messageID, (err) => {}, true);

      const albumOptions = [
        "𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐂𝐚𝐫𝐭𝐨𝐨𝐧 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐋𝐨𝐅𝐢 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐂𝐨𝐮𝐩𝐥𝐞 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐅𝐥𝐨𝐰𝐞𝐫 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐀𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐒𝐢𝐠𝐦𝐚 𝐑𝐮𝐥𝐞 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐋𝐲𝐫𝐢𝐜𝐬 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐂𝐚𝐭 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐅𝐫𝐞𝐞 𝐅𝐢𝐫𝐞 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐆𝐢𝐫𝐥 𝐕𝐢𝐝𝐞𝐨 📔",
        "𝐅𝐫𝐢𝐞𝐧𝐝𝐬 𝐕𝐢𝐝𝐞𝐨 📔",
      ];

      const message =
        "𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐚𝐥𝐛𝐮𝐦 𝐯𝐢𝐝𝐞𝐨 𝐥𝐢𝐬𝐭 📔\n" +
        "━━━━━━━━━━━━━━━━━━━━━\n" +
        albumOptions.map((option, index) => `${index + 1}. ${option}`).join("\n") +
        "\n━━━━━━━━━━━━━━━━━━━━━";

      await api.sendMessage(
        message,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
            link: albumOptions,
          });
        },
        event.messageID
      );
    }
  },

  onReply: async function ({ api, event, Reply }) {
    api.unsendMessage(Reply.messageID);

    const categories = [
      "funny",
      "islamic",
      "sad",
      "anime",
      "cartoon",
      "lofi",
      "couple",
      "flower",
      "aesthetic",
      "sigma",
      "lyrics",
      "cat",
      "freefire",
      "football",
      "girl",
      "friends",
    ];

    const captions = [
      "❰ 𝐅𝐮𝐧𝐧𝐲 𝐕𝐢𝐝𝐞𝐨 <😹 ❱",
      "❰ 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 <🕋 ❱",
      "❰ 𝐒𝐚𝐝 𝐕𝐢𝐝𝐞𝐨 <😿 ❱",
      "❰ 𝐀𝐧𝐢𝐦𝐞 𝐕𝐢𝐝𝐞𝐨 <🥱 ❱",
      "❰ 𝐂𝐚𝐫𝐭𝐨𝐨𝐧 𝐕𝐢𝐝𝐞𝐨 <❤️‍🩹 ❱",
      "❰ 𝐋𝐨𝐅𝐢 𝐕𝐢𝐝𝐞𝐨 <🌆 ❱",
      "❰ 𝐂𝐨𝐮𝐩𝐥𝐞 𝐕𝐢𝐝𝐞𝐨 <💑 ❱",
      "❰ 𝐅𝐥𝐨𝐰𝐞𝐫 𝐕𝐢𝐝𝐞𝐨 <🌸 ❱",
      "❰ 𝐀𝐞𝐬𝐭𝐡𝐞𝐭𝐢𝐜 𝐕𝐢𝐝𝐞𝐨 <🎨 ❱",
      "❰ 𝐒𝐢𝐠𝐦𝐚 𝐕𝐢𝐝𝐞𝐨 <🗿 ❱",
      "❰ 𝐋𝐲𝐫𝐢𝐜𝐬 𝐕𝐢𝐝𝐞𝐨 <🎵 ❱",
      "❰ 𝐂𝐚𝐭 𝐕𝐢𝐝𝐞𝐨 <🐱 ❱",
      "❰ 𝐅𝐫𝐞𝐞 𝐅𝐢𝐫𝐞 𝐕𝐢𝐝𝐞𝐨 <🔥 ❱",
      "❰ 𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐕𝐢𝐝𝐞𝐨 <⚽ ❱",
      "❰ 𝐆𝐢𝐫𝐥 𝐕𝐢𝐝𝐞𝐨 <💃 ❱",
      "❰ 𝐅𝐫𝐢𝐞𝐧𝐝𝐬 𝐕𝐢𝐝𝐞𝐨 <👫🏼 ❱",
    ];

    const replyIndex = parseInt(event.body);
    if (isNaN(replyIndex) || replyIndex < 1 || replyIndex > categories.length) {
      return api.sendMessage("⚠️ Please reply with a valid number from the list!", event.threadID);
    }

    let query = categories[replyIndex - 1];
    let cp = captions[replyIndex - 1];

    try {
      const response = await axios.get(`https://mahabub-video-api-we90.onrender.com/mahabub/${query}`);
      const videoUrl = response.data.data;

      if (!videoUrl) {
        return api.sendMessage("❌ No video found for this category!", event.threadID);
      }

      const filePath = path.join(__dirname, "temp_video.mp4");
      await axios({ url: videoUrl, method: "GET", responseType: "stream" }).then(response =>
        response.data.pipe(fs.createWriteStream(filePath)).on("finish", () =>
          api.sendMessage({ body: cp, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath))
        )
      );

    } catch (error) {
      api.sendMessage("❌ Failed to fetch or download the video.", event.threadID);
    }
  },
};
