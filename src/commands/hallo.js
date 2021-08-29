const Command = require('../structures/Command');

module.exports = new Command({
	name: 'hallo',
	description: 'says Hallo',
		
	run: async (client, interaction, args) => {

		await interaction.reply('Hello motahfockah');
		
	},

});