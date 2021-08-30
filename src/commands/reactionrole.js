const { MessageEmbed } = require('discord.js');
const Command = require('../structures/Command');

module.exports = new Command({
	name: __filename.replace('.js','').replace(/.*\\/,''),
  description: 'Shows the ping of the bot!',
		
	run: async (client, message, args) => {

    const redEmoji = "🔴";
    const greenEmoji = "🟢";
    const blueEmoji = "🔵";
    const purpleEmoji = "💜";
    const orangeEmoji = "🟠";

    const embed = new MessageEmbed()
       .setTitle("test")
       .setDescription("howdy")
       .setColor("RANDOM");
			 
    let embedMessage = await message.channel.send({ embeds: [embed]});
    embedMessage.react(redEmoji);
    embedMessage.react(greenEmoji);
    embedMessage.react(blueEmoji);
    embedMessage.react(purpleEmoji);
    embedMessage.react(orangeEmoji);
		
    message.reply('Sure thing boss!');

	}

});