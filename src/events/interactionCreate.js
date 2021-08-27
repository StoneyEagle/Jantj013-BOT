module.exports = {
	name: 'interactionCreate',
	execute: async (client, e) => {

		console.log(`${e.user.tag} in #${e.channel.name} triggered ${e.commandName}`);
		
		if (!e.isCommand()) return;

		const command = client.commands.get(e.commandName);

		if (!command) return;

		try {
			await command.execute(e);
		} catch (error) {
			console.warn(error);
			await e.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		
	},
};