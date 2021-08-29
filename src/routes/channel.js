const { DiscordAPIError } = require('../helpers/error');
const apiClient = require('./apiClient');

const getChannel = async (channel) => {

  const {data} = await apiClient.get(`/channels/${channel?.id || channel}`, )
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getChannelMessages = async (channel) => {

  const {data} = await apiClient.get(`/channels/${channel?.id || channel}/messages`, )
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const getChannelMessage = async (channel, message) => {

  const {data} = await apiClient.get(`/channels/${channel?.id || channel}/messages/${message.id || message}`, )
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

const bulkDeleteMessages = async (channel, body) => {
  
  console.log(JSON.stringify({
    messages: body.map(b => b.id)
  }));

  const {data} = await apiClient.post(`/channels/${channel?.id || channel}/messages/bulk-delete`, {
      body: JSON.stringify(body.map(b => b.id))
    })
    .catch(error => {
      throw new DiscordAPIError(error);
    });

  return data;
};

module.exports = {
  getChannel,
  getChannelMessages,
  getChannelMessage,
  bulkDeleteMessages,
};