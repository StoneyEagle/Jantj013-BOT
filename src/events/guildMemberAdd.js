const { createUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberAdd',
	execute: async (client, member) => {

		await createUser(member);
		
		const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		member.send(message);
		
	},
};