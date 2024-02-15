const { prismaMedia } = require("../config/database");
const { listGuildMembers, getGuildRoles } = require("../routes/guild");
const { getColors, diff } = require("./functions");

/**`
 * * User.
 * @param {string} userId
 */
const findUserById = async (id) => {
  
  const user = await prismaMedia.user.findFirst({
    where: {
      id: id
    },
  });
  
  return user;
}

/**`
 * * User roles list.
 * @param {string} userId Defaults to all roles.
 */
const getRoles = async (userId = undefined) => {
  let roles = await prismaMedia.role.findMany({
    where: {
      user: {
        some: {
          id: userId,
        }
      }
    }
  });

  roles = roles.map(role => {
    return {
      id: role.id,
      name: role.name.match(/[\w\d\s_\.-]+/g)[0],
      color: getColors(role.color)
    };
  });

  return roles;
}

/**
 * * Create user in database.
 * @param {object} user
 */
const createUser = async (user) => {
  let data = {
    id: user.user.id,
    username: user.user.username,
    avatar: user.user.avatar,
    discriminator: user.user.discriminator,
    public_flags: user.user.flags.bitfield,
    mute: false,
    deaf: false,
    nick: user.nick,
    premium_since: user.premiumSinceTimestamp,
    joined_at: new Date(),
    pending: user.pending,
    bot: user.user.bot,
    deleted_at: null,
    role: {
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

  const u = await prismaMedia.user.upsert({
    where: {
      id: data.id
    },
    update: data,
    create: data,
  });
  
  console.log(`User ${user.user.username} joined.`);
  console.log('______________________________________________________________________');
  return u;
};

/**
 * * Remove user from database.
 * @param {object} user
 */
const deleteUser = async (user) => {

  await prismaMedia.user.update({
    where: {
      id: user.user.id
    },
    data: {
      deleted_at: new Date(),
    }
  });
  
  console.log(`User ${user.user.username} deleted.`);
  console.log('______________________________________________________________________');
};

/**
 * * Ban user in database.
 * @param {object} user
 */
const banUser = async (user) => {

  await prismaMedia.user.update({
    where: {
      id: user.user.id
    },
    data: {
      banned_at: new Date(),
    }
  });
  
  console.log(`User ${user.user.username} banned.`);
  console.log('______________________________________________________________________');
};

/**
 * * Unban user in database.
 * @param {object} user
 */
const unbanUser = async (user) => {

  await prismaMedia.user.update({
    where: {
      id: user.user.id
    },
    data: {
      banned_at: null,
    }
  });
  
  console.log(`User ${user.user.username} unbanned.`);
  console.log('______________________________________________________________________');
};

/**
 * * Update user roles in database.
 * @param {object} user
 */
const updateUserRoles = async (user) => {

  const roles = await getRoles(user.id);
  let response = await listGuildMembers();

  if (response.roles?.length > 0 && (roles.length > response.roles.length || roles.length < response.roles.length)) {

    await prismaMedia.roleOnUser.deleteMany({
      where: {
        userId: user.id,
      }
    });

    await prismaMedia.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: {
          connectOrCreate: response.roles.map(role => {
            return {
              where: {
                roleId_userId: {
                  roleId: role,
                  userId: user.id,
                }
              },
              create: {
                roleId: role,
              },
            }
          }),
        }
      }
    });

    const allRoles = await getRoles();

    const added = response.roles.filter(x => !roles.map(r => r.id).includes(x))
    if(added.length > 0){
      console.log(`User ${user.username} added to role: "${allRoles.find(r => r.id == added).name}"`);
    }

    const removed = roles.map(r => r.id).filter(x => !response.roles.includes(x));
    if(removed.length > 0){
      console.log(`User ${user.username} removed from role: "${allRoles.find(r => r.id == removed).name}"`);
    }
    console.log('______________________________________________________________________');
  }

};

const createRole = async (role) => {

  const getRole = (await getGuildRoles()).find(r => r.id == role.id);

  await prismaMedia.role.create({
    data: {
      id: getRole.id,
      name: getRole.name.match(/[\w\d\s_\.-]+/g)[0],
      displayName: getRole.name,
      position: parseInt(getRole.position),
      color: parseInt(getRole.color),
      hoist: getRole.hoist,
      managed: getRole.managed,
      mentionable: getRole.mentionable,
      icon: getRole.icon,
      permissions: getRole.permissions.toString()
    }
  });
  
  console.log(`Created role "${getRole.name}"`);
  console.log('______________________________________________________________________');

};

const updateRole = async (role) => {
  
  const currentRole = await prismaMedia.role.findFirst({
    where: {
      id: role.id
    },
  });

  const getRole = (await getGuildRoles()).find(r => r.id == role.id);
  getRole.displayName = getRole.name;
  getRole.name = getRole.name.match(/[\w\d\s_\.-]+/g)[0];

  await prismaMedia.role.update({
    where: {
      id: getRole.id
    },
    data: {
      id: getRole.id,
      name: getRole.name.match(/[\w\d\s_\.-]+/g)[0],
      displayName: getRole.name,
      position: parseInt(getRole.position),
      color: parseInt(getRole.color),
      hoist: getRole.hoist,
      managed: getRole.managed,
      mentionable: getRole.mentionable,
      icon: getRole.icon,
      permissions: getRole.permissions.toString()
    },
    select: {
      name: true,
    }
  });

  const changes = diff(currentRole, getRole);

  console.log(`Role "${currentRole.name}" changed:`);
  console.log(changes);
  console.log('______________________________________________________________________');
  

};

const deleteRole = async (role) => {

  const deleted = await prismaMedia.role.delete({
    where: {
      id: role.id
    }
  });

  console.log(`Deleted role "${deleted.name}"`);
  console.log('______________________________________________________________________');

};

module.exports = {
  findUserById,
  getRoles,
  createUser,
  updateUserRoles,
  deleteUser,
  unbanUser,
  banUser,
  updateRole,
  deleteRole,
  createRole,
}