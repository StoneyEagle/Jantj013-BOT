module.exports = {
	name: 'messageReactionRemove',
	/**
	 * @param {import('discord.js').Client} client
	 * @param {import('discord.js').MessageReaction} messageReaction
	 * @param {string[]} args
	 */
	run: async (client, messageReaction, user) => {

		if (user.bot) return;

		const guild = client.guilds.cache.find(g => g.id === process.env.GUILD_ID);
		const User = guild.members.cache.find(m => m.user.id == user.id);
		const fortnite = guild.roles.cache.find(r => r.name.includes('Fortnite'));
		const music = guild.roles.cache.find(r => r.name.includes('Music'));
		const relax = guild.roles.cache.find(r => r.name.includes('Relax'));
		const uno = guild.roles.cache.find(r => r.name.includes('Uno'));
		const skribbl = guild.roles.cache.find(r => r.name.includes('Skribbl'));

    const redEmoji = "🔴";
    const greenEmoji = "🟢";
    const blueEmoji = "🔵";
    const purpleEmoji = "💜";
    const orangeEmoji = "🟠";

		if (messageReaction.emoji.name == redEmoji) {
			await User.roles.remove(uno);
		}
		else if (messageReaction.emoji.name == greenEmoji) {
			await User.roles.remove(fortnite);
		}
		else if (messageReaction.emoji.name == blueEmoji) {
			await User.roles.remove(relax);
		}
		else if (messageReaction.emoji.name == purpleEmoji) {
			await User.roles.remove(music);
		}
		else if (messageReaction.emoji.name == orangeEmoji) {
			await User.roles.remove(skribbl);
		}

		messageReaction.message.reply(`Removed ${messageReaction.emoji.name} from your roles.`);

	},
};