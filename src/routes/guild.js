const { REST } = require('@discordjs/rest');
const { makeQuery } = require('../helpers/functions');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const createGuilds = async (data) => {
  return rest.post(`/guilds/${process.env.GUILD_ID}`, JSON.stringify({
    name: data.name,
    icon: data.icon,
    verification_level: data.verification_level || null,
    default_message_notifications: data.default_message_notifications || null,
    explicit_content_filter: data.explicit_content_filter,
    roles: data.roles || null,
    channels: data.channels || null,
    afk_channel_id: data.afk_channel_id || null,
    afk_timeout: data.afk_timeout || null,
    system_channel_id: data.system_channel_id || null,
    system_channel_flags: data.system_channel_flags || null,
  }));
};

const getGuilds = async () => {
  return rest.get(`/guilds/${process.env.GUILD_ID}`);
};

const getGuildChannels = async () => {
  return rest.get(`/guilds/${process.env.GUILD_ID}/channels`);
};

const postGuildChannels = async (body) => {
  return rest.post(`/guilds/${process.env.GUILD_ID}/channels`, {
    body
  });
};

const modifyGuildChannels = async (body) => {
  return rest.patch(`/guilds/${process.env.GUILD_ID}/channels`, {
    body
  });
};

const getGuildActiveThreads = async () => {
  return rest.get(`/guilds/${process.env.GUILD_ID}/threads/active`);
};

const getGuildMembers = async () => {

  let query = makeQuery({
    limit: 1000,
  });

  return rest.get(`/guilds/${process.env.GUILD_ID}/members${query}`);
};

const getGuildMember = async (user) => {
  return rest.get(`/guilds/${process.env.GUILD_ID}/members/${user.id}`);
};

const patchGuildMember = async (user, body) => {
  return rest.patch(`/guilds/${process.env.GUILD_ID}/members/${user.id}`, {
    body
  });
};


const putGuildMemberRole = async (user, roleName) => {

  let selectedRole = role.find(r => r.name == roleName);

  return rest.put(`/guilds/${process.env.GUILD_ID}/members/${user.id}/roles/${selectedRole.id}`);
};

const deleteGuildMemberRole = async (user, roleName) => {

  let selectedRole = role.find(r => r.name == roleName);

  return rest.delete(`/guilds/${process.env.GUILD_ID}/members/${user.id}/roles/${selectedRole.id}`);
};

const getGuildRoles = async (user, roleName) => {
  return rest.get(`/guilds/${process.env.GUILD_ID}/roles`);
};


const getGuildSearchMember = async (query, limit = undefined) => {
  return rest.get(`/guilds/${process.env.GUILD_ID}/members/search`, {
    query,
    limit
  });
};



module.exports = {
  createGuilds,
  getGuilds,
  getGuildChannels,
  postGuildChannels,
  modifyGuildChannels,
  getGuildRoles,
  getGuildActiveThreads,
  getGuildMembers,
  getGuildMember,
  patchGuildMember,
  putGuildMemberRole,
  deleteGuildMemberRole,
  getGuildSearchMember,
};

