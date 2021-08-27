const { deleteUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberRemove',
	execute: async (client, member) => {
			
		await deleteUser(member);

		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};