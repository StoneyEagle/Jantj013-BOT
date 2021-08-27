
const events = require('../events');
const commands = require('../commands');
const router = require('./router');
const migrations = require('./migrations');
const seed = require('./seed');

module.exports = (client) => {

  console.log('______________________________________________________________________');
  console.log('Starting Jantj013 Bot.');

  client.commands = commands(client);

  router(client);

  client.login(process.env.TOKEN);

  client.on('ready', async () => {
    
    console.log('Setting up the database.');

    await migrations();
    await seed();
    
    events(client);

    console.log('Bot is ready to go.');
    console.log('______________________________________________________________________');

  });

};