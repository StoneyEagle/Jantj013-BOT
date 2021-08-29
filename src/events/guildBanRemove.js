const { unbanUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {
			
		await unbanUser(message);


		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};