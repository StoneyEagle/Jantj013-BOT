const fs = require('fs');

/**
 * @param {import('discord.js').Client} client} 
 */
module.exports = (client) => {

  const eventFiles = fs.readdirSync(__dirname).filter(file => file != 'index.js');

  for (const file of eventFiles) {

    const event = require(`${__dirname}/${file}`);

    if (event.once) {
      client.once(event.name, async (...args) => event.run(client, ...args));
    } else {
      client.on(event.name, async (...args) => event.run(client, ...args));
    }

  }

  return client;
};

