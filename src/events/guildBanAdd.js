const { banUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanAdd',
	execute: async (client, member) => {

		await banUser(member);


		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};