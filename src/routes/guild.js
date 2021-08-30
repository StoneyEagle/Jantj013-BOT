


const { DiscordAPIError } = require('../helpers/error');
const apiClient = require('./apiClient');


const getGuildMember = async (user) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user || user}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const listGuildMembers = async (limit = 1000) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/members`, {
    params: {
      query:{
        limit: limit,
      }
    }
    })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const searchGuildMembers = async (query, limit = 1000) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/members/search`, {
      query,
      limit
    })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

module.exports = {
  getGuildMember,
  listGuildMembers,
  searchGuildMembers,
};

