const { getRoles, createRole } = require("../helpers/database");

module.exports = {
	name: 'roleCreate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Role} role
	 * @param {string[]} args
	 */
	run: async (client, role, args) => {

		await createRole(role);
		// console.log(role, args);
	},
};