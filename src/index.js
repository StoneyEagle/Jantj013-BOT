require("dotenv").config();

const loaders = require('./loaders');
const Client = require("./structures/Client");

const client = new Client();

loaders(client);
