const { updateRole } = require("../helpers/database");

module.exports = {
	name: 'roleUpdate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {

		await updateRole(message);
	},
};