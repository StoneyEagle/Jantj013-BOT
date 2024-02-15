
module.exports = (message) => {
  
  return {
    title: `Welcome in the ${message.member.guild.name} Discord server.`,
    description: `\n
    1. Be respectful to others

    2. A question is only stupid if you know the answer.
    
    3. Respect the topics for each channel.
    
    4. No sexually explicit content.
    
    5. Do not spam.\n\n
    `,
    color: 7419530,
    timestamp: new Date(),
    footer: {
      icon_url: `https://cdn.discordapp.com/icons/${message.member.guild.id}/${message.member.guild.icon}.jpeg`,
      text: `${message.member.guild.name} | Rules.`
    },
    thumbnail: {
      url: `https://cdn.discordapp.com/icons/${message.member.guild.id}/${message.member.guild.icon}.jpeg`,
    },
    fields: [
      {
        name: "\n\nAccept",
        value: "By clicking the accept button you agree the rules\n\n"
      },
    ]
  }
};
