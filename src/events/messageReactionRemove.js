module.exports = {
	name: 'messageReactionRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').MessageReaction} messageReaction
	 * @param {string[]} args
	 */
	run: async (client, messageReaction, user) => {
		if (user.bot) return;

		// const guild = client.guilds.cache.find(
		// 	(g) => g.id === process.env.GUILD_ID
		// );
		// const User = guild.members.cache.find((m) => m.user.id == user.id);

		// const member = guild.roles.cache.find((r) =>
		// 	r.name.includes("Member")
		// );
		// const checkBox = "✅";

		// if (messageReaction.emoji.name == checkBox) {
		// 	await User.roles.add(member);
		// }

		// messageReaction.message.reply(
		// 	`${member} removed from your roles.`
		// );

		// client.on("raw", async (data) => {
		// 	if (
		// 		data.t == "MESSAGE_REACTION_REMOVE" &&
		// 		data.d.user_id == User.id
		// 	) {
		// 		client.emit("messageReactionRemove", messageReaction, user);
		// 	}
		// });

	},
};