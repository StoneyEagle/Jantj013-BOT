const { updateUserRoles } = require("../helpers/database");

module.exports = {
	name: 'guildMemberUpdate',
	execute: async (client, newMember) => {

		await updateUserRoles(newMember.user);

	
	},
};