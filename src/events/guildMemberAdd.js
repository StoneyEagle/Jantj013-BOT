const { createUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').GuildMember} member
	 * @param {string[]} args
	 */
	run: async (client, member, args) => {

		await createUser(member);
		
		const msg = `Welcome motahfockin <@${member.user.username} to our server!`;

		member.send(msg);
		// console.log(member, args);
	},
};