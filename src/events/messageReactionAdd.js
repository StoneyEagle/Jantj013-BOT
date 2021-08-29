const { getRoles, createRole } = require("../helpers/database");

module.exports = {
	name: 'messageReactionAdd',
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
			await User.roles.add(uno);
		}
		else if (messageReaction.emoji.name == greenEmoji) {
			await User.roles.add(fortnite);
		}
		else if (messageReaction.emoji.name == blueEmoji) {
			await User.roles.add(relax);
		}
		else if (messageReaction.emoji.name == purpleEmoji) {
			await User.roles.add(music);
		}
		else if (messageReaction.emoji.name == orangeEmoji) {
			await User.roles.add(skribbl);
		}

		messageReaction.message.reply(`Added ${messageReaction.emoji.name} to your roles.`);

    client.on('raw', async (data) => {
      if(data.t == 'MESSAGE_REACTION_REMOVE' && data.d.user_id == User.id){
				client.emit('messageReactionRemove', messageReaction, user);
				client.off('raw');
			}
		});

	},
};