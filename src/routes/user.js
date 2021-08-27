const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const getUser = async (user) => {
  return rest.get(`/users/${user.id}`);
};



module.exports = {
  getUser,
};