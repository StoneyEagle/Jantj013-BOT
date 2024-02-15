const Command = require("../structures/Command");
const fetchAll = require('discord-fetch-all');
const { prismaMedia } = require("../config/database");

module.exports = new Command({
	name: __filename.replace(".js", "").replace(/.*\\/, ""),
	description: "Clears all your messages in this this thread",
	run: async (client, interaction, args) => {
		// console.log(args);

		const allMessages = await fetchAll.messages(interaction.channel, {
			// userOnly: true, // Only return messages by users
			botOnly: false, // Only return messages by bots
		});

		// const isElevated = interaction.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Moderator' || role.name === '.');
		// console.log(allMessages.filter(m => m.author.username === (isElevated ? 'Stoney_Eagle': interaction.member.user.username)));
		
		allMessages.filter(m => m.author.username === interaction.member.user.username).forEach(async(m) => {
			await m.delete();
		});
		
		interaction.reply('Ok');
	},
});
