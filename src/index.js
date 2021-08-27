require("dotenv").config();

const { Client, Intents } = require('discord.js');

const loader  = require('./loaders');

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
  ],
});

loader(client);
