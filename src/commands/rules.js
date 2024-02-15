const { MessageActionRow, MessageButton } = require("discord.js");
const rules = require("../embeds/rules");
const Command = require("../structures/Command");

module.exports = new Command({
	name: __filename.replace(".js", "").replace(/.*\\/, ""),
	description: "Accept the rules",

	run: async (client, message) => {
	
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId("rules_accepted")
				.setLabel("#Accept")
				.setStyle("SUCCESS")
				.setEmoji(client.emojis.cache.first().id),
			new MessageButton()
				.setCustomId("rules_not_accepted")
				.setLabel("#Decline")
				.setStyle("DANGER")
				.setEmoji(client.emojis.cache.first().id)
		);

		const embed = rules(message);

		await message.channel.send({ embeds: [embed], components: [row] });
	},
});
