const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = () => {

    let commands = new Collection();
  
    const commandFiles = fs.readdirSync(__dirname).filter(file => file != 'index.js');
  
    for (const file of commandFiles) {
  
      const command = require(`${__dirname}/${file}`);
  
      commands.set(command.data.name, command);
    }
    
    return commands;

};
