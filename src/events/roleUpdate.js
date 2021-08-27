const { updateRole } = require("../helpers/database");

module.exports = {
	name: 'roleUpdate',
	execute: async (client, newRole) => {

		await updateRole(newRole);
	},
};