const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hallo')
		.setDescription('says Hallo'),
	async execute(interaction) {
		await interaction.reply('Hello motahfockah');
	},
};