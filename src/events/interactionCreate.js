
module.exports = {
	name: 'interactionCreate',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').Interaction} message
	 */
	run: async (client, message, args) => {

		const guild = client.guilds.cache.find(g => g.id === process.env.GUILD_ID);
		const user = guild.members.cache.find(m => m.user.id == message.user.id);
		const accept = guild.roles.cache.find(r => r.name == 'Accept');
		const decline = guild.roles.cache.find(r => r.name == 'Decline');

		if (message.isButton()) {
			if (message.customId == 'rules_accepted') {
				user.roles.add(accept.id);
				user.roles.remove(decline.id);
				message.reply('Welcome!');
			}
			else if (message.customId == 'rules_not_accepted') {
				user.roles.remove(accept.id);
				user.roles.add(decline.id);
				message.reply('Fuck you then!');
			}
		}

		if (!message.isCommand()) {
			console.log(message)
			return;
		}

		console.log(`${message.user.tag} in #${message.channel.name} triggered ${message.commandName}`);
		const command = client.commands.get(message.commandName);

		if (!command) return;


		try {
			await command.run(client, message, args);
		} catch (error) {
			console.warn(error);
			await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}

	},
};