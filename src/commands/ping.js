const Command = require('../structures/Command');

module.exports = new Command({
	name: __filename.replace('.js','').replace(/.*\\/,''),
  description: 'Shows the ping of the bot!',
	run: async (client, interaction, args) => {

		await interaction.reply(`Ping: ${client.ws.ping} ms.`);
	
	},
});