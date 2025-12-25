const axios = require("axios");
const FormData = require("form-data");
const url = require("url");
const path = require("path");

module.exports = {
  config: {
    name: "catbox",
    aliases: ["cbx"],
    version: "2.9",
    author: "Mahabub",
    countDown: 3,
    role: 0,
    shortDescription: "Upload replied media to Catbox (URL only)",
    longDescription: "Reply to any image, GIF, or video to upload it to Catbox. Only the URL will be sent.",
    category: "utility",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, api }) {
    const { messageReply } = event;

    if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
      return api.sendMessage("⚠️ Please reply to an image, GIF, or video first.", event.threadID, event.messageID);
    }

    const attachment = messageReply.attachments[0];
    const mediaUrl = attachment.url;
    if (!mediaUrl) return api.sendMessage("❌ Could not retrieve media URL.", event.threadID, event.messageID);

    let loadingMsg;
    try {
      // 1️⃣ Initial "Uploading..." message
      loadingMsg = await api.sendMessage(
`♻️ 𝘂𝗽𝗹𝗼𝗮𝗱𝗶𝗻𝗴...`,
        event.threadID
      );

      // 2️⃣ Download media
      const mediaBuffer = (await axios.get(mediaUrl, { responseType: "arraybuffer" })).data;

      // Determine extension
      let ext;
      if (attachment.type.includes("video")) ext = ".mp4";
      else if (attachment.type.includes("animated_image")) ext = ".gif";
      else ext = path.extname(url.parse(mediaUrl).pathname) || ".jpg";

      // 3️⃣ Prepare form
      const form = new FormData();
      form.append("reqtype", "fileupload");
      form.append("userhash", "");
      form.append("fileToUpload", mediaBuffer, { filename: "upload" + ext });

      // 4️⃣ Upload to Catbox
      const upload = await axios.post("https://catbox.moe/user/api.php", form, {
        headers: {
          ...form.getHeaders(),
          "authority": "catbox.moe",
          "accept": "application/json",
          "origin": "https://catbox.moe",
          "referer": "https://catbox.moe/",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; Mobile) Chrome/137 Safari/537.36"
        },
        maxBodyLength: Infinity,
        timeout: 180000
      });

      let catboxUrl = upload.data.trim();
      if (!catboxUrl.startsWith("https://")) {
        return api.editMessage(
          `❌╔════════════════╗
   Catbox upload failed.
   Response: ${catboxUrl}
╚════════════════╝`,
          loadingMsg.messageID
        );
      }

      // Force proper extension in URL
      if (attachment.type.includes("video")) catboxUrl = catboxUrl.replace(/\.video$/, ".mp4");
      else if (attachment.type.includes("animated_image")) catboxUrl = catboxUrl.replace(/\.video$/, ".gif");
      else if (ext) catboxUrl = catboxUrl.replace(/\.video$/, ext);

      // Get sender ID and name
      const senderID = event.senderID;
      let senderName = senderID;
      try {
        const userInfo = await api.getUserInfo(senderID);
        senderName = userInfo[senderID]?.name || senderID;
      } catch (e) {}

      // 5️⃣ Edit message with final premium message
      const finalMsg = 
`🟢╔════════════════════════╗
✨ Catbox Upload Complete ✨
╚════════════════════════╝

📦 Media uploaded successfully!

🌐 Direct URL:
${catboxUrl}

──────────────────────────
🔥 𝗨𝗽𝗹𝗼𝗮𝗱𝗲𝗿: ${senderName} 
🕒 𝗦𝘁𝗮𝘁𝘂𝘀: ✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀
──────────────────────────`;

      await api.editMessage(finalMsg, loadingMsg.messageID);

    } catch (err) {
      console.error("❌ Catbox Upload Error:", err);
      if (loadingMsg?.messageID) {
        await api.editMessage(
`❌╔════════════════╗
   Upload Failed
   Error: ${err.message}
╚════════════════╝`,
          loadingMsg.messageID
        );
      } else {
        await api.sendMessage(
`❌╔════════════════╗
   Upload Failed
   Error: ${err.message}
╚════════════════╝`,
          event.threadID,
          event.messageID
        );
      }
    }
  }
};
