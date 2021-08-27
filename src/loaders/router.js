
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

module.exports = (client) => {

  (async () => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: client.commands.map(c => c.data) },
      );

      console.log('Successfully registered application commands.');
      
    } catch (error) {
      console.error(error);
    }
    
  })();
};