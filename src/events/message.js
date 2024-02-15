
module.exports = {
	name: 'messageCreate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Message} message
	 * @param {string[]} args
	 */
	run: async (client, message, args) => {
		// console.log(message, args);
		if (!message.content.startsWith('/') || message.author.bot) return;

		const arg = message.content.slice(1).trim().split(' ');
		const command = arg.shift().toLowerCase();
		console.log(command);
	},
};