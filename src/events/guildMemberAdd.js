const { createUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {

		await createUser(message);
		
		const msg = `Welcome motahfockin <@${message.user.username} to our server!`;

		message.send(msg);
		
	},
};