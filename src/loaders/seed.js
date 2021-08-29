const { prismaMedia } = require("../config/database");

async function seed(client) {

  let transaction = [];

  client.guilds.cache.forEach(g => {
    g.roles.cache.forEach(role => {
      let data = {
        id: role.id,
        name: role.name.match(/[\w\d\s_\.-]+/g)[0],
        displayName: role.name,
        position: parseInt(role.position),
        color: parseInt(role.color),
        hoist: role.hoist,
        managed: role.managed,
        mentionable: role.mentionable,
        icon: role.icon,
        permissions: role.permissions.toString()
      };
      transaction.push(prismaMedia.role.upsert({
        where: {
          id: data.id
        },
        update: data,
        create: data,
      }));
    });

    g.members.cache.map(user => {
      let data = {
        id: user.user.id,
        username: user.user.username,
        avatar: user.user.avatar,
        discriminator: user.user.discriminator,
        public_flags: user.user.flags?.bitfield || 0,
        mute: user.mute || false,
        deaf: user.deaf || false,
        nick: user.nick,
        premium_since: user.premium_since,
        joined_at: new Date(user.joinedTimestamp),
        is_pending: user.is_pending,
        pending: user.pending,
        bot: user.user.bot,
        role_user: {
          connectOrCreate: user._roles.map(role => {
            return {
              where: {
                roleId_userId: {
                  roleId: role,
                  userId: user.user.id,
                }
              },
              create: {
                roleId: role,
              },
            }
          }),
        },
      };

      transaction.push(prismaMedia.user.upsert({
        where: {
          id: data.id
        },
        update: data,
        create: data,
      }));
    });
  });

  await prismaMedia.$transaction(transaction);
  
  console.log('Database seeded.');
}

module.exports = seed;