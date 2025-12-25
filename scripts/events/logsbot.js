const { getTime } = global.utils;

// Function to convert normal text to bold Unicode
function toBold(text) {
    return text.replace(/[A-Za-z0-9]/g, c => {
        if (c >= 'a' && c <= 'z') return String.fromCharCode(c.charCodeAt(0) + 0x1d41a - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCharCode(c.charCodeAt(0) + 0x1d400 - 65);
        if (c >= '0' && c <= '9') return String.fromCharCode(c.charCodeAt(0) + 0x1d7ce - 48);
        return c;
    });
}

// Function to convert text to italic Unicode
function toItalic(text) {
    return text.replace(/[A-Za-z]/g, c => {
        if (c >= 'a' && c <= 'z') return String.fromCharCode(c.charCodeAt(0) + 0x1d44e - 97);
        if (c >= 'A' && c <= 'Z') return String.fromCharCode(c.charCodeAt(0) + 0x1d434 - 65);
        return c;
    });
}

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.6",
		author: "NTKhang",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: `📘 ${toBold("Nhật ký Bot")} 📘`,
			added: `🟢 ${toBold("Sự kiện")}: Bot đã được thêm vào nhóm mới\n👤 ${toItalic("Người thêm")}: \`%1\``,
			kicked: `🔴 ${toBold("Sự kiện")}: Bot bị kick khỏi nhóm\n👤 ${toItalic("Người kick")}: \`%1\``,
			footer: `💻 ${toBold("User ID")}: \`%1\`\n👥 ${toBold("Nhóm")}: \`%2\`\n🆔 ${toBold("ID nhóm")}: \`%3\`\n⏰ ${toBold("Thời gian")}: \`%4\``
		},
		en: {
			title: `📘 ${toBold("Bot Logs")} 📘`,
			added: `🟢 ${toBold("Event")}: Bot has been added to a new group\n👤 ${toItalic("Added by")}: \`%1\``,
			kicked: `🔴 ${toBold("Event")}: Bot has been kicked from the group\n👤 ${toItalic("Kicked by")}: \`%1\``,
			footer: `💻 ${toBold("User ID")}: \`%1\`\n👥 ${toBold("Group")}: \`%2\`\n🆔 ${toBold("Group ID")}: \`%3\`\n⏰ ${toBold("Time")}: \`%4\``
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {
		if (
			(event.logMessageType === "log:subscribe" && event.logMessageData.addedParticipants.some(p => p.userFbId === api.getCurrentUserID())) ||
			(event.logMessageType === "log:unsubscribe" && event.logMessageData.leftParticipantFbId === api.getCurrentUserID())
		) return async function () {
			const { config } = global.GoatBot;
			const { author, threadID } = event;
			if (author === api.getCurrentUserID()) return;

			let threadName;
			let msg = `╔════════════════════╗\n`;
			msg += `📌 ${getLang("title")}\n`;
			msg += `╠════════════════════╣\n`;

			if (event.logMessageType === "log:subscribe") {
				threadName = (await api.getThreadInfo(threadID)).threadName;
				const authorName = await usersData.getName(author);
				msg += `${getLang("added", authorName)}\n`;
			} else if (event.logMessageType === "log:unsubscribe") {
				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);
				threadName = threadData.threadName;
				msg += `${getLang("kicked", authorName)}\n`;
			}

			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += `╠────────────────────╣\n`;
			msg += `${getLang("footer", author, threadName, threadID, time)}\n`;
			msg += `╚════════════════════╝`;

			for (const adminID of config.adminBot) {
				api.sendMessage(msg, adminID);
			}
		};
	}
};
