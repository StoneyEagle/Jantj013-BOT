const axios = require("axios");

const apiClient = axios.create();

apiClient.defaults.baseURL = `https://discord.com/api/v9`;

apiClient.interceptors.request.use(
  async (conf) => {
    conf.params = {
      ...conf.params,
    };
    
    return new Promise((resolve) => {
      conf.headers["Accept"] = "application/json";
      conf.headers.Authorization = `Bot ${process.env.TOKEN}`;
      
      resolve(conf);
    });
  },
  function (error) {
    console.log(error.response.message);
    return Promise.reject(error.response.message);
  }
);

module.exports = apiClient;
