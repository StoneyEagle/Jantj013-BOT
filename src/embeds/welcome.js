
module.exports = (message, user) => {
  console.log(message, user)
  return {
    title: `Hi ${user.username}, Welcome in the ${message.member.guild.name} Discord server.`,
    description: `\n
      We are delighted that you joined our Discord server.\n
      If you have any questions, our @Moderator's are happy to help!\n    
    `,
    color: 7419530,
    timestamp: new Date(),
    footer: {
      icon_url: `https://cdn.discordapp.com/icons/${message.member.guild.id}/${message.member.guild.icon}.jpeg`,
      text: `${message.member.guild.name} | Welcome.`
    },
    thumbnail: {
      url: `https://cdn.discordapp.com/icons/${message.member.guild.id}/${message.member.guild.icon}.jpeg`,
    }
  }
};
