const { updateUserRoles } = require("../helpers/database");

module.exports = {
	name: 'guildMemberUpdate',
	execute: async (oldMember, newMember) => {

		await updateUserRoles(newMember.user);

		

	},
};