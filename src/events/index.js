const fs = require('fs');

module.exports = (client) => {

  const eventFiles = fs.readdirSync(__dirname).filter(file => file != 'index.js');

  for (const file of eventFiles) {

    const event = require(`${__dirname}/${file}`);

    if (event.once) {
      client.once(event.name, async (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, async (...args) => event.execute(client, ...args));
    }

  }

  return client;
};
