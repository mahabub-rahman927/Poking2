const axios = require("axios");

module.exports = {
  config: {
    name: "flux",
    version: "2.0.0",
    role: 0,
    credits: "Dipto | Converted for GoatBot",
    description: "Flux Image Generator",
    prefix: false,
    premium: false,
    category: "Image Generator",
    usage: "flux [prompt] --ratio 1024x1024",
    cooldown: 15
  },

  onStart: async function ({ api, event, args }) {
    const dipto = "https://www.noobs-api.rf.gd/dipto";

    try {
      const prompt = args.join(" ");
      const [prompt2, ratio = "1:1"] = prompt.includes("--ratio")
        ? prompt.split("--ratio").map(s => s.trim())
        : [prompt, "1:1"];

      const startTime = Date.now();

      // send waiting message
      const wait = await api.sendMessage("Generating image, please wait... 😘", event.threadID);
      api.setMessageReaction("⌛", event.messageID, () => {}, true);

      const apiurl = `${dipto}/flux?prompt=${encodeURIComponent(prompt2)}&ratio=${encodeURIComponent(ratio)}`;
      const response = await axios.get(apiurl, { responseType: "stream" });

      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

      // remove waiting message
      api.unsendMessage(wait.messageID);

      // send final output
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage({
        body: `Here's your image (Generated in ${timeTaken} seconds)`,
        attachment: response.data
      }, event.threadID, event.messageID);

    } catch (e) {
      console.error(e);
      api.sendMessage("⚠️ Error: " + e.message, event.threadID, event.messageID);
    }
  }
};