const { prismaMedia } = require("../config/database");
const { getGuildMember } = require("../routes/guild");
const { getColors } = require("./functions");


/**
 * * User roles list.
 * @param {string} userId Defaults to all roles.
 */
 const getRoles = async (userId = undefined) => {
  let roles = await prismaMedia.role.findMany({
    where: {
      role_user: {
        some: {
          userId: userId,
        },
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

const updateUserRoles = async (user) => {
  
  const roles = await getRoles(user.id);
  let response = await getGuildMember(user);

  if (roles.length > response.roles.length || roles.length < response.roles.length) {
    
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
        role_user: {
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
  }
  
};

module.exports = {
  getRoles,
  updateUserRoles,
}