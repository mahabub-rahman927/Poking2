const axios = require("axios");

module.exports.config = {
  name: "nt",
  version: "4.0.0",
  author: "MR᭄﹅ MAHABUB﹅ メꪜ",
  role: 0,
  category: "chat",
  guide: {
    en: "{pn} → random question\n{pn} ask=Q$ans=A or ask=Q&ans=A (manual teach)"
  }
};

module.exports.onStart = async function ({ api, event, args }) {
  try {
    const text = args.join(" ").trim();

    if (text.startsWith("ask=") && (text.includes("$ans=") || text.includes("&ans="))) {
      const match = text.match(/ask=(.?)(?:\$ans=|&ans=)(.)/);
      if (!match)
        return api.sendMessage(
          "❌ Wrong format\nUse:\nnt ask=Q$ans=A\nor\nnt ask=Q&ans=A",
          event.threadID
        );

      const question = match[1].trim();
      const answer = match[2].trim();

      if (!question || !answer)
        return api.sendMessage("❌ Question or answer missing", event.threadID);

      await axios.get(
        `https://mahabubxnirob-simisimi.onrender.com/teach?q=${encodeURIComponent(
          question
        )}&ans=${encodeURIComponent(answer)}`
      );

      return api.sendMessage(
        `✅ Manually taught!\n\n🧠 Question:\n❝ ${question} ❞\n\n💬 Answer:\n❝ ${answer} ❞`,
        event.threadID
      );
    }

    const question = await getRandomQuestion();
    if (!question) return api.sendMessage("❌ No question found", event.threadID);

    const sent = await api.sendMessage(
      `🧠 Next Question 🤯\n\n❝ ${question} ❞\n\n💬 Reply with your answer`,
      event.threadID
    );

    global.GoatBot.onReply.set(sent.messageID, {
      commandName: "nt",
      type: "teach",
      question,
      editID: sent.messageID
    });
  } catch (e) {
    console.log("unable to get new question:", e);
    api.sendMessage("❌ something went wrong", event.threadID);
  }
};

module.exports.onReply = async function ({ api, event, usersData }) {
  try {
    const replyID = event.messageReply?.messageID;
    if (!replyID) return;

    const data = global.GoatBot.onReply.get(replyID);
    if (!data || data.type !== "teach") return;

    const answer = event.body?.trim();
    if (!answer) return;

    await axios.get(
      `https://mahabubxnirob-simisimi.onrender.com/teach?q=${encodeURIComponent(
        data.question
      )}&ans=${encodeURIComponent(answer)}`
    );

    await usersData.addMoney(event.senderID, 100);
    const user = await usersData.get(event.senderID);
    const teacherName = await usersData.getName(event.senderID);

    const editedMsg =
      `✅ Reply saved!\n\n` +
      `🧠 Question:\n❝ ${data.question} ❞\n\n` +
      `💬 Answer:\n❝ ${answer} ❞\n\n` +
      `💰 Reward: +100 Money\n` +
      `💳 Balance: ${user.money}\n\n` +
      `👤 Teacher: ${teacherName}`;

    await api.editMessage(editedMsg, data.editID);
    global.GoatBot.onReply.delete(replyID);

    const nextQuestion = await getRandomQuestion();
    if (!nextQuestion) return;

    const sent = await api.sendMessage(
      `🧠 Next Question 🤯\n\n❝ ${nextQuestion} ❞\n\n💬 Reply with your answer`,
      event.threadID
    );

    global.GoatBot.onReply.set(sent.messageID, {
      commandName: "nt",
      type: "teach",
      question: nextQuestion,
      editID: sent.messageID
    });
  } catch (e) {
    console.log("api error:", e);
  }
};

async function getRandomQuestion() {
  try {
    const res = await axios.get("https://mahabubxnirob-simisimi.onrender.com/nt");
    return res.data?.question || null;
  } catch (e) {
    console.log("something went worng:", e);
    return null;
  }
}
