
/**
 * 
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {



    // console.log(client.channels.cache); // get channels
    // console.log(client.guilds.cache); // get guilds
    // console.log(client.emojis.cache); // get emojis
    // console.log(client.commands) // get commands
    // console.log(client.options) // get options
    // console.log(client.guilds.cache.find(g => g.id === process.env.GUILD_ID));
    
    
    client.guilds.cache.filter(c => c.id == process.env.GUILD_ID).forEach(g => {
      // console.log(g);
      // console.log(g.members.cache.map(r => {
      //   delete r.guild;
      //   return r
      // }));
      // console.log(g.channels.cache.find(c => c.guild.id == process.env.GUILD_ID).guild.stickers.cache);
      // console.log(g.bans.cache);
      // console.log(g.roles.cache);
      // console.log(g.commands.);
      // console.log(g.emojis.cache);
      // console.log(g.me.cache);
    }) 
    


}