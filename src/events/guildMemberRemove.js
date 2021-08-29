const { deleteUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {
			
		await deleteUser(message);

		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};