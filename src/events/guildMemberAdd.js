const welcome = require("../embeds/welcome");
const { createUser } = require("../helpers/database");

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').GuildMember} member
	 * @param {string[]} args
	 */
	run: async (client, member, args) => {
		try {
			const user = await createUser(member);
			
			const msg = `Hey <@${member.user.username}, Welcome to our server!`;
	
			member.send(msg);
			
		} catch (error) {
			
		}
		
	},
};