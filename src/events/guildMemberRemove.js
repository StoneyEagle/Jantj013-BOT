const { deleteUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').GuildMember} member
	 * @param {string[]} args
	 */
	run: async (client, member, args) => {
			
		await deleteUser(member);
		// console.log(member, args);
		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};