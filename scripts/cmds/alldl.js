const fs = require("fs-extra");
const axios = require("axios");
const request = require("request");
const https = require("https");

module.exports = {
  config: {
    name: "auto",
    version: "5.9",
    author: "MR᭄﹅ MAHABUB﹅ メꪜ",
    countDown: 5,
    role: 0,
    shortDescription: "Auto video downloader",
    category: "media"
  },

  onStart: async function ({ api, event }) {
    return api.sendMessage(
      "📥 Send the link to download the video 🎥",
      event.threadID
    );
  },

  onChat: async function ({ api, event }) {
    if (!event.body) return;

    const threadID = event.threadID;
    const message = event.body.trim();
    const linkMatch = message.match(/(https?:\/\/[^\s]+)/);
    if (!linkMatch) return;

    const videoLink = linkMatch[0];
    const isYouTube = /youtube\.com|youtu\.be/.test(videoLink);

    // ♻ Requesting to API
    api.setMessageReaction("♻", event.messageID, () => {}, true);

    const isFacebook = videoLink.includes("facebook.com");
    const headers = isFacebook
      ? {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "*/*",
          "Referer": "https://www.facebook.com/"
        }
      : { "User-Agent": "Mozilla/5.0" };

    const httpsAgent = isFacebook ? new https.Agent({ family: 4 }) : undefined;
    const apiBaseURL = global.GoatBot.config.api;
    const filePath = `video_${Date.now()}.mp4`;

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    // ================= API RETRY =================
    const fetchWithRetry = async (url, retries = 3) => {
      for (let i = 1; i <= retries; i++) {
        try {
          return await axios.get(url, {
            headers,
            httpsAgent,
            timeout: 30000
          });
        } catch {
          if (i === retries) throw new Error("API_FAILED");
          await wait(2000);
        }
      }
    };

    // ================= DOWNLOAD RETRY =================
    const downloadWithRetry = (url, retries = 3) => {
      return new Promise((resolve, reject) => {
        const attempt = (n) => {
          request({ url, headers, timeout: 30000 })
            .pipe(fs.createWriteStream(filePath))
            .on("close", resolve)
            .on("error", async () => {
              if (n < retries) {
                await wait(2000);
                attempt(n + 1);
              } else reject();
            });
        };
        attempt(1);
      });
    };

    // ================= SEND + REACT ON ATTACHMENT =================
    const sendAttachmentWithRetry = async (text, retries = 3) => {
      let delivered = false;

      // Timeout check (60s)
      setTimeout(() => {
        if (!delivered) {
          api.setMessageReaction("❌", event.messageID, () => {}, true);
        }
      }, 30000);

      for (let i = 1; i <= retries; i++) {
        try {
          await new Promise((resolve, reject) => {
            api.sendMessage(
              {
                body: text,
                attachment: fs.createReadStream(filePath)
              },
              threadID,
              (err, info) => {
                if (err) return reject(err);

                // ✅ Attachment delivered reaction on attachment message
                api.setMessageReaction("✅", info.messageID, () => {}, true);
                delivered = true;
                resolve();
              }
            );
          });
          return true;
        } catch {
          if (i === retries) {
            api.setMessageReaction("❌", event.messageID, () => {}, true);
            delivered = true;
            return false;
          }
          await wait(2000);
        }
      }
    };

    try {
      // ===== API CALL =====
      const res = await fetchWithRetry(
        `${apiBaseURL}/mahabub/dl?url=${encodeURIComponent(videoLink)}`
      );

      const { platform, title, hd, sd } = res.data;
      if (!hd && !sd) throw new Error("NO_URL");

      // ===== Quality order =====
      const qualityOrder = isYouTube ? [sd, hd] : [hd, sd];

      let downloaded = false;
      for (const url of qualityOrder) {
        if (!url) continue;

        try {
          await downloadWithRetry(url);
          downloaded = true;
          break;
        } catch {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
      }

      if (!downloaded) throw new Error("DOWNLOAD_FAILED");

      // ✔ API passed (after download success)
      api.setMessageReaction("✔", event.messageID, () => {}, true);

      const text =
        `📥 𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗲𝗱!\n\n` +
        `📌 Platform: ${platform || "Unknown"}\n` +
        `🎬 Title: ${title || "No Title"}`;

      // ===== SEND =====
      const sent = await sendAttachmentWithRetry(text, 3);
      if (!sent) api.setMessageReaction("❌", event.messageID, () => {}, true);

      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    } catch {
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  }
};
