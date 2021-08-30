const { updateRole } = require("../helpers/database");

module.exports = {
	name: 'roleUpdate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Role} role
	 * @param {string[]} args
	 */
	run: async (client, role, args) => {

		await updateRole(role);
		// console.log(role, args);
	},
};