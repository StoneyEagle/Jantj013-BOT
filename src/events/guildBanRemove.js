const { unbanUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').GuildBan} guild
	 * @param {import('discord.js').GuildMember} user
	 * @param {string[]} args
	 */
	run: async (client, guild, user, args) => {
			
		await unbanUser(user);
		// console.log(user, args);

		
		// const message = `Welcome motahfockin <@${member.user.username} to our server!`;

		// member.send(message);
		
	},
};