const { getTime, drive } = global.utils;

module.exports = {
  config: {
    name: "leave",
    version: "1.6",
    author: "NTKhang | styled by Mahabub",
    category: "events"
  },

  langs: {
    en: {
      session1: "🌅 ᴍᴏʀɴɪɴɢ",
      session2: "☀️ ɴᴏᴏɴ",
      session3: "🌇 ᴀꜰᴛᴇʀɴᴏᴏɴ",
      session4: "🌙 ᴇᴠᴇɴɪɴɢ",
      leaveType1: "ʟᴇꜰᴛ ᴛʜᴇ ɢʀᴏᴜᴘ",
      leaveType2: "ᴡᴀꜱ ʀᴇᴍᴏᴠᴇᴅ ꜰʀᴏᴍ ᴛʜᴇ ɢʀᴏᴜᴘ",
      defaultLeaveMessage:
        "👋 ʟᴇᴀᴠᴇ ᴇᴠᴇɴᴛ\n\n🧑 ᴜꜱᴇʀ: {userName}\n❌ ᴛʏᴘᴇ: {type}\n💬 ɢʀᴏᴜᴘ: {threadName}\n⏰ ᴛɪᴍᴇ: {time}\n🌏 ꜱᴇꜱꜱɪᴏɴ: {session}"
    },
    vi: {
      session1: "🌅 ʙᴜᴏ̂̉ɪ ꜱᴀ́ɴɢ",
      session2: "☀️ ʙᴜᴏ̂̉ɪ ᴛʀᴜ̛ᴀ",
      session3: "🌇 ʙᴜᴏ̂̉ɪ ᴄʜɪᴇ̂̀ᴜ",
      session4: "🌙 ʙᴜᴏ̂̉ɪ ᴛᴏ̂́ɪ",
      leaveType1: "ᴛᴜ̛̣ ʀᴏ̛̀ɪ ɴʜᴏ́ᴍ",
      leaveType2: "ʙɪ̣ ᴋɪᴄᴋ ᴋʜᴏ̉ɪ ɴʜᴏ́ᴍ",
      defaultLeaveMessage:
        "👋 ꜱᴜ̛̣ ᴋɪᴇ̣̂ɴ ᴛʀᴀɪɴɢ\n\n🧑 ɴɢᴜ̛ᴏ̛̀ɪ ᴅᴜ̀ɴɢ: {userName}\n❌ ʟᴏᴀ̣ɪ: {type}\n💬 ɴʜᴏ́ᴍ: {threadName}\n⏰ ᴛʜᴏ̛̀ɪ ɢɪᴀɴ: {time}\n🌏 ʙᴜᴏ̂̉ɪ: {session}"
    }
  },

  onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
    if (event.logMessageType == "log:unsubscribe")
      return async function () {
        const { threadID } = event;
        const threadData = await threadsData.get(threadID);
        if (!threadData.settings.sendLeaveMessage) return;

        const { leftParticipantFbId } = event.logMessageData;
        if (leftParticipantFbId == api.getCurrentUserID()) return;

        const hours = getTime("HH");
        const fullTime = getTime("DD/MM/YYYY HH:mm");

        const threadName = threadData.threadName;
        const userName = await usersData.getName(leftParticipantFbId);

        let { leaveMessage = getLang("defaultLeaveMessage") } =
          threadData.data;

        const type =
          event.author === leftParticipantFbId
            ? getLang("leaveType1")
            : getLang("leaveType2");

        leaveMessage = leaveMessage
          .replace(/\{userName\}|\{userNameTag\}/g, userName)
          .replace(/\{type\}/g, type)
          .replace(/\{threadName\}|\{boxName\}/g, threadName)
          .replace(/\{time\}/g, fullTime)
          .replace(
            /\{session\}/g,
            hours <= 10
              ? getLang("session1")
              : hours <= 12
              ? getLang("session2")
              : hours <= 18
              ? getLang("session3")
              : getLang("session4")
          );

        const form = {
          body: leaveMessage
        };

        if (leaveMessage.includes("{userNameTag}")) {
          form.mentions = [
            {
              id: leftParticipantFbId,
              tag: userName
            }
          ];
        }

        if (threadData.data.leaveAttachment) {
          const files = threadData.data.leaveAttachment;
          const attachments = files.map(file =>
            drive.getFile(file, "stream")
          );
          form.attachment = (await Promise.allSettled(attachments))
            .filter(({ status }) => status == "fulfilled")
            .map(({ value }) => value);
        }

        message.send(form);
      };
  }
};
