const { getRoles, createRole } = require("../helpers/database");

module.exports = {
	name: 'roleCreate',
	execute: async (client, role) => {

		await createRole(role);
		
	},
};