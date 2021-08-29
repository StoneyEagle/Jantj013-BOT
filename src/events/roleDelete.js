const { deleteRole } = require("../helpers/database");

module.exports = {
	name: 'roleDelete',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {

		await deleteRole(message);

	},
};