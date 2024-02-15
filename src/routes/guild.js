


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
      limit: limit,
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

const getGuildRoles = async (query, limit = 1000) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/roles`, {
      query,
      limit
    })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

module.exports = {
  getGuildRoles,
  getGuildMember,
  listGuildMembers,
  searchGuildMembers,
};

