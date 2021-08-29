const Command = require('../structures/Command');

module.exports = new Command({
	name: 'ping',
  description: 'Shows the ping of the bot!',
	run: async (client, interaction, args) => {

		await interaction.reply(`Ping: ${client.ws.ping} ms.`);
	
	},
});