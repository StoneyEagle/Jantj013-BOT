const { updateUserRoles } = require("../helpers/database");

module.exports = {
	name: 'guildMemberUpdate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {

		await updateUserRoles(message.user);

	
	},
};