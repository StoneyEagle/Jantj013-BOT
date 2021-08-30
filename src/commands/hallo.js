const Command = require('../structures/Command');
module.exports = new Command({
	name: __filename.replace('.js','').replace(/.*\\/,''),
	description: 'says Hallo',
		
	run: async (client, interaction, args) => {

		await interaction.reply('Hello motahfockah');
		
	},

});