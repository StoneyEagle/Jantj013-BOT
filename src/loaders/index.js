
const events  = require('../events');
const commands  = require('../commands');
const router = require('./router');
const { getRoles } = require('../helpers');
const migrations = require('./migrations');
const seed = require('./seed');

module.exports = (client) => {
  
  client.commands = commands(client);

  router(client);
  events(client);

  client.on('ready', async () => {

    await migrations();
    await seed();
    
  });
  
  client.login(process.env.TOKEN).then((e) => {
    console.log('logged in.');
  });

};