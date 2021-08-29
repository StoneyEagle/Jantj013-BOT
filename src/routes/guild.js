const { DiscordAPIError } = require('../helpers/error');
const apiClient = require('./apiClient');

const createGuild = async (body) => {

  const { data } = await apiClient.post(`/guilds/${process.env.GUILD_ID}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuild = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}`, {
    params: {
      with_count: true,
    }
  })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildPreview = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/preview`).catch(error => {
    throw new DiscordAPIError(error);
  });

  return data;
};

const modifyGuild = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const deleteGuild = async () => {

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}`).catch(error => {
    throw new DiscordAPIError(error);
  });

  return data;
};

const getGuildChannels = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/channels`).catch(error => {
    throw new DiscordAPIError(error);
  });

  return data;
};

const createGuildChannel = async (body) => {

  const { data } = await apiClient.post(`/guilds/${process.env.GUILD_ID}/channels`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildChannelPositions = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/channels`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const listActiveThreads = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/threads/active`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

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

const addGuildMember = async (user) => {

  if (!body.acces_token) {
    throw new DiscordAPIError('You must provide an access_token.');
  }

  const { data } = await apiClient.put(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildMember = async (user, body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyCurrentUserNick = async (nick) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/members/@me/nick`, JSON.stringify(nick))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const addGuildMemberRole = async (user, role) => {

  if (role && Number.isInteger(parseInt(role))) {
    role = (await getGuildRoles()).find(r => r.name == role)?.id;

    if (!role) {
      throw new DiscordAPIError('This role does not exist.');
    }
  }

  const { data } = await apiClient.put(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user}/roles/${role}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const removeGuildMemberRole = async (user, role) => {

  if (role && Number.isInteger(parseInt(role))) {
    role = (await getGuildRoles()).find(r => r.name == role).id;

    if (!role) {
      throw new DiscordAPIError('This role does not exist.');
    }
  }

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user}/roles/${role}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const removeGuildMember = async (user) => {

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}/members/${user?.id || user}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildBans = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/bans`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildBan = async (user) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/bans/${user?.id || user}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const createGuildBan = async (body) => {

  const { data } = await apiClient.put(`/guilds/${process.env.GUILD_ID}/bans/${user?.id || user}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const removeGuildBan = async (user) => {

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}/bans/${user?.id || user}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildRoles = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/roles`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const createGuildRole = async (body) => {

  const { data } = await apiClient.post(`/guilds/${process.env.GUILD_ID}/roles`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildRolePositions = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/roles`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildRole = async (role, body) => {

  if (role && Number.isInteger(parseInt(role))) {
    role = (await getGuildRoles()).find(r => r.name == role).id;

    if (!role) {
      throw new DiscordAPIError('This role does not exist.');
    }
  }

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/roles/${role}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const deleteGuildRole = async (role) => {

  if (role && Number.isInteger(parseInt(role))) {
    role = (await getGuildRoles()).find(r => r.name == role).id;

    if (!role) {
      throw new DiscordAPIError('This role does not exist.');
    }
  }

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}/roles/${role}`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildPruneCount = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/prune`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const beginGuildPrune = async (body) => {

  const { data } = await apiClient.post(`/guilds/${process.env.GUILD_ID}/prune`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildVoiceRegions = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/regions`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildInvites = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/invites`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildIntergrations = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/integrations`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const deleteGuildIntergration = async (intergration) => {

  const { data } = await apiClient.delete(`/guilds/${process.env.GUILD_ID}/integrations/${integrations.id || integrations}`,)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildWidgetSettings = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/widget`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildWidgetSettings = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/widget`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildWidget = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/widget.json`)
    .catch((error) => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildVanityURL = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/vanity-url`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildWidgetImage = async (style) => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/widget.png`, {
    params: {
      style
    }
  })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getGuildWelcomeScreen = async () => {

  const { data } = await apiClient.get(`/guilds/${process.env.GUILD_ID}/welcome-screen`)
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyGuildWelcomeScreen = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/welcome-screen`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyCurrentUserVoiceState = async (body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/voice-states/@me`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const modifyUserVoiceState = async (user, body) => {

  const { data } = await apiClient.patch(`/guilds/${process.env.GUILD_ID}/voice-states/${user?.id || user}`, JSON.stringify(body))
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};


module.exports = {
  createGuild,
  getGuild,
  getGuildPreview,
  modifyGuild,
  deleteGuild,
  getGuildChannels,
  createGuildChannel,
  modifyGuildChannelPositions,
  listActiveThreads,
  getGuildMember,
  listGuildMembers,
  searchGuildMembers,
  addGuildMember,
  modifyGuildMember,
  modifyCurrentUserNick,
  addGuildMemberRole,
  removeGuildMemberRole,
  removeGuildMember,
  getGuildBans,
  getGuildBan,
  createGuildBan,
  removeGuildBan,
  getGuildRoles,
  createGuildRole,
  modifyGuildRolePositions,
  modifyGuildRole,
  deleteGuildRole,
  getGuildPruneCount,
  beginGuildPrune,
  getGuildVoiceRegions,
  getGuildInvites,
  getGuildIntergrations,
  deleteGuildIntergration,
  getGuildWidgetSettings,
  modifyGuildWidgetSettings,
  getGuildWidget,
  getGuildVanityURL,
  getGuildWidgetImage,
  getGuildWelcomeScreen,
  modifyGuildWelcomeScreen,
  modifyCurrentUserVoiceState,
  modifyUserVoiceState,
};

