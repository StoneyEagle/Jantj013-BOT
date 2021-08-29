const { banUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanAdd',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {

		await banUser(member);

		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};