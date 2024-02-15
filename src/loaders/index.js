const events = require('../events');
const commands = require('../commands');
const router = require('./router');
const migrations = require('./migrations');
const seed = require('./seed');
const test = require('./test');

/**
 * @param {import('discord.js').Client} client} 
 */
module.exports = (client) => {

  console.log('______________________________________________________________________');
  console.log(`Starting ${process.env.BOT_NAME}.`);

  commands(client);
  router(client);
  events(client);

  client.login(process.env.TOKEN);

  client.once('ready', async () => {
    await client.user.setPresence({ 
      activities: [{ 
        name: 'Starting...' 
      }], 
      status: 'dnd' 
    });

    console.log('Setting up the database.');

    await migrations();
    await seed(client);

    await client.user.setPresence({ 
      activities: [{ 
        name: 'Being GOD' 
      }], 
      status: 'online' 
    });

    console.log('Bot is ready to go.');
    console.log('______________________________________________________________________');

    test(client);

  });

};
