const { banUser } = require("../helpers/database");

module.exports = {
	name: 'guildBanAdd',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').GuildBan} guild
	 * @param {import('discord.js').GuildMember} user
	 * @param {string[]} args
	 */
	run: async (client, guild, user, args) => {

		await banUser(user);
		// console.log(user, args);
		
		// const guild = `Welcome motahfockin <@${guild.user.username} to our server!`;

		// guild.send(guild);
		
	},
};