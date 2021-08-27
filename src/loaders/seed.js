const { prismaMedia } = require("../config/database");
const { getGuildRoles, getGuildMembers } = require('../routes/guild');

async function seed() {

  let transaction = [];

  let roles = await getGuildRoles();
  roles.forEach(role => {
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

  let members = await getGuildMembers();
  members.forEach(user => {
    let data = {
      id: user.user.id,
      username: user.user.username,
      avatar: user.user.avatar,
      discriminator: user.user.discriminator,
      public_flags: user.user.public_flags,
      mute: user.mute,
      deaf: user.deaf,
      nick: user.nick,
      premium_since: user.premium_since,
      joined_at: user.joined_at,
      is_pending: user.is_pending,
      pending: user.pending,
      bot: user.user.bot,
      role_user: {
        connectOrCreate: user.roles.map(role => {
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

  await prismaMedia.$transaction(transaction);
  
  console.log('Database seeded.');
}

module.exports = seed;