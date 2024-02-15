const { getRoles, createRole } = require("../helpers/database");

module.exports = {
	name: "messageReactionAdd",
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').MessageReaction} message
	 * @param {string[]} args
	 */
	run: async (client, message, user) => {
		if (user.bot) return;

		// const guild = client.guilds.cache.find(
		// 	(g) => g.id === process.env.GUILD_ID
		// );
		// const User = guild.members.cache.find((m) => m.user.id == user.id);

		// const member = guild.roles.cache.find((r) =>
		// 	r.name.includes("Member")
		// );
		// const checkBox = "✅";

		// if (message.emoji.name == checkBox) {
		// 	await User.roles.add(member);
		// }

		// message.message.reply(
		// 	`${member} added to your roles.`
		// );

		// client.on("raw", async (data) => {
		// 	if (
		// 		data.t == "MESSAGE_REACTION_REMOVE" &&
		// 		data.d.user_id == User.id
		// 	) {
		// 		client.emit("messageReactionRemove", message, user);
		// 	}
		// });
	},
};
