
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

/**
 * @param {import('discord.js').Client} client} 
 */
module.exports = (client) => {

  (async () => {
    try {
      console.log('Registering commands.');
      
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: client.commands },
      );

      console.log('Successfully registered application commands.');

    } catch (error) {
      console.error(error);
    }

  })();
};