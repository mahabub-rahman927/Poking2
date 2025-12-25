const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "editimg",
   aliases: ["edit"],
    version: "1.0.0",
    role: 0,
    credits: "IMRAN | Converted for GoatBot",
    description: "AI image editing using prompt + image or attachment",
    prefix: true,
    category: "Image Generator",
    usage: "editimg [prompt] + reply image or link",
    cooldown: 5
  },

  onStart: async function ({ api, event, args }) {
    let imageUrl = event.messageReply?.attachments?.[0]?.url || null;
    const prompt = args.join(" ").split("|")[0]?.trim();

    // If link provided after pipe
    if (!imageUrl && args.length > 1) {
      imageUrl = args.join(" ").split("|")[1]?.trim();
    }

    // Validate usage
    if (!imageUrl || !prompt) {
      return api.sendMessage(
        `📸 𝙀𝘿𝙄𝙏•𝙄𝙈𝙂\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `⛔️ You must provide both a prompt and an image!\n\n` +
        `✨ Example:\n` +
        `▶️ editimg add cute girlfriend |\n\n` +
        `🖼️ Or reply to an image:\n` +
        `▶️ editimg add cute girlfriend`,
        event.threadID,
        event.messageID
      );
    }

    imageUrl = imageUrl.replace(/\s/g, "");
    if (!/^https?:\/\//.test(imageUrl)) {
      return api.sendMessage(
        `⚠️ Invalid image URL!\n` +
        `🔗 Must start with http:// or https://`,
        event.threadID,
        event.messageID
      );
    }

    const apiUrl = `https://masterapi.fun/api/editimg?prompt=${encodeURIComponent(prompt)}&image=${encodeURIComponent(imageUrl)}`;

    // Send waiting message
    const waitMsg = await api.sendMessage(`⏳ Please wait, generating image...`, event.threadID);

    try {
      const tempPath = path.join(__dirname, "cache", `edited_${event.senderID}.jpg`);
      const response = await axios({
        method: "GET",
        url: apiUrl,
        responseType: "stream"
      });

      const writer = fs.createWriteStream(tempPath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: `🔍 Prompt: "${prompt}"\n🖼️ AI image ready! ✨`,
            attachment: fs.createReadStream(tempPath)
          },
          event.threadID,
          () => {
            fs.unlinkSync(tempPath);
            api.unsendMessage(waitMsg.messageID);
          },
          event.messageID
        );
      });

      writer.on("error", (err) => {
        console.error(err);
        api.sendMessage(`❌ Failed to save the image file.`, event.threadID, event.messageID);
      });

    } catch (error) {
      console.error(error);
      api.sendMessage(`❌ Failed to generate image. Try again later.`, event.threadID, event.messageID);
    }
  }
};
