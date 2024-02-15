const { prismaMedia } = require("../config/database");
const Command = require("../structures/Command");
const welcome = require("../embeds/welcome");

module.exports = new Command({
	name: __filename.replace(".js", "").replace(/.*\\/, ""),
	description: "sends newsletter to subscribed users",

	run: async (client, message, args) => {
		const users = await prismaMedia.user.findMany({
			where: {
				role: {
					some: {
						name: "Newsletter subscription",
					},
					none: {
						name: "Bots",
					},
				},
			},
		});

		const { MessageActionRow, MessageButton } = require("discord.js");

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
    
    const oldMessage = message;
		users.forEach(async (user) => {
			const channel = client.users.cache.get(user.id);
			const message = welcome(oldMessage, user);

			await channel.send({ embeds: [message], components: [row] });
		});

		message.reply("Sure thing boss!");
	},
});
