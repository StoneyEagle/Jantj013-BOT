const { deleteRole } = require("../helpers/database");

module.exports = {
	name: 'roleDelete',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Role} role
	 * @param {string[]} args
	 */
	run: async (client, role, args) => {

		await deleteRole(role);
		// console.log(role, args);
	},
};