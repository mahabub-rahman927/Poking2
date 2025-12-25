const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "blink",
    version: "1.2",
    author: "NIB",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Generate blinking GIFs using profile pictures"
    },
    longDescription: {
      en: "Create a blinking GIF with the avatars of mentioned users."
    },
    category: "image",
    guide: "{pn} @mention1 @mention2 ..."
  },

  onStart: async function ({ event, message, usersData }) {
    try {
      // Ensure cache directory exists
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      // Collect avatar links
      const ids = Object.keys(event.mentions);
      const links = [await usersData.getAvatarUrl(event.senderID)];

      for (const id of ids) {
        links.push(await usersData.getAvatarUrl(id));
      }

      if (links.length === 0) {
        return message.reply("❌ | No valid users found to blink.");
      }

      // Generate Blink GIF
      const img = await new DIG.Blink().getImage(150, ...links);
      const pathSave = path.join(cacheDir, "Blink.gif");

      // Save file
      await fs.writeFile(pathSave, Buffer.from(img));

      // Send image
      message.reply({
        attachment: fs.createReadStream(pathSave)
      }, () => fs.unlinkSync(pathSave));

    } catch (err) {
      console.error(err);
      message.reply(`❌ | An error occurred: ${err.message}`);
    }
  }
};