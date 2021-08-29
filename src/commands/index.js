const fs = require('fs');
const Command = require('../structures/Command');

module.exports = (client) => {
  
    const commandFiles = fs.readdirSync(__dirname).filter(file => file != 'index.js');
  
    for (const file of commandFiles) {
      /**
       * @type {Command}
       */
      const command = require(`${__dirname}/${file}`);
  
      client.commands.set(command.name, command);
    }

};
