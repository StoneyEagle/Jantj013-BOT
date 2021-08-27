const { deleteRole } = require("../helpers/database");

module.exports = {
	name: 'roleDelete',
	execute: async (client, role) => {

		await deleteRole(role);

	},
};