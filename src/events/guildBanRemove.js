const { unbanUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanRemove',
	execute: async (client, member) => {
			
		await unbanUser(member);


		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};