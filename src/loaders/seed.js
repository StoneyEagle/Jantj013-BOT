const { prismaMedia } = require("../config/database");
/**
 * 
 * @param {import('discord.js').Client} client 
 */
const seed = async (client) => {

  let transaction = [];

  await Promise.all(
  client.guilds.cache.map(async g => {
    let data = {
      id: g.id,
      name: g.name,
      icon: g.icon,
      features: JSON.stringify(g.features),
      deleted: g.deleted,
      available: g.available,
      shardId: g.shardId,
      splash: g.splash,
      banner: g.banner,
      description: g.description,
      verificationLevel: g.verificationLevel,
      vanityURLCode: g.vanityURLCode,
      nsfwLevel: g.nsfwLevel,
      discoverySplash: g.discoverySplash,
      memberCount: g.memberCount,
      large: g.large,
      applicationId: g.applicationId,
      afkTimeout: g.afkTimeout,
      afkChannelId: g.afkChannelId,
      systemChannelId: g.systemChannelId,
      premiumTier: g.premiumTier,
      premiumSubscriptionCount: g.premiumSubscriptionCount,
      explicitContentFilter: g.explicitContentFilter,
      mfaLevel: g.mfaLevel,
      joinedTimestamp: new Date(g.joinedTimestamp),
      defaultMessageNotifications: g.defaultMessageNotifications,
      // systemChannelFlags: [SystemChannelFlags],
      maximumMembers: g.maximumMembers,
      maximumPresences: g.maximumPresences,
      approximateMemberCount: g.approximateMemberCount,
      approximatePresenceCount: g.approximatePresenceCount,
      vanityURLUses: g.vanityURLUses,
      rulesChannelId: g.rulesChannelId,
      publicUpdatesChannelId: g.publicUpdatesChannelId,
      preferredLocale: g.preferredLocale,
      ownerId: g.ownerId,
    }
    transaction.push(prismaMedia.guild.upsert({
      where: {
        id: data.id
      },
      update: data,
      create: data,
    }));
    
    g.channels.cache.map(channel => {
      let data = {
        type: channel.type,
        deleted: channel.deleted,
        guildId: channel.guildId,
        parentId: channel.parentId,
        nsfw: channel.nsfw,
        id: channel.id,
        name: channel.name,
        rawPosition: channel.rawPosition,
        topic: channel.topic,
        lastMessageId: channel.lastMessageId,
        rateLimitPerUser: channel.rateLimitPerUser,
        guild: {
          connect: {
            id: channel.guild.id
          }
        }
      }
      transaction.push(prismaMedia.channel.upsert({
        where: {
          id: data.id,
        },
        update: data,
        create: data,
      }));
    });
    
    g.roles.cache.map(role => {
      let data = {
        id: role.id,
        name: role.name.match(/[\w\d\s_\.-]+/g)[0],
        displayName: role.name,
        rawPosition: parseInt(role.rawPosition),
        color: parseInt(role.color),
        hoist: role.hoist,
        managed: role.managed,
        mentionable: role.mentionable,
        icon: role.icon,
        deleted: role.deleted,
        tags: JSON.stringify(role.tags),
        permissions: role.permissions.toString(),
        guild: {
          connect: {
            id: role.guild.id
          }
        },
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
        guild: {
          connect: {
            id: user.guild.id
          }
        },
        role: {
          connect: user._roles.map(r => {
            return {
              id: r
            }
          })
        }

      };
      transaction.push(prismaMedia.user.upsert({
        where: {
          id: data.id
        },
        update: data,
        create: data,
      }));
    });

    g.emojis.cache.map(emoji => {
      let data = {
        animated: emoji.animated,
        name: emoji.name,
        id: emoji.id,
        deleted: emoji.deleted,
        requiresColons: emoji.requiresColons,
        managed: emoji.managed,
        available: emoji.available,
        roles: JSON.stringify(emoji._roles),
        guild: {
          connect: {
            id: emoji.guild.id
          }
        },
      }
      transaction.push(prismaMedia.emoji.upsert({
        where: {
          id: data.id
        },
        update: data,
        create: data,
      }));
    });

    // g.voiceStates.cache.map(voiceState => {
    //   // TODO:
    //   console.log(voiceState);
    // })
    
    const commands = await g.commands.fetch();
    commands.map(async command => {
      let data = {
        id: command.id,
        applicationId: command.applicationId,
        guildId: command.guildId,
        type: command.type,
        name: command.name,
        description: command.description,
        options: JSON.stringify(command.options),
        defaultPermission: command.defaultPermission,
        guild: {
          connect: {
            id: command.guild.id
          }
        }
      }
      transaction.push(prismaMedia.command.upsert({
        where: {
          id: data.id
        },
        update: data,
        create: data,
      }));
    });

    const invites = await g.invites.fetch();
    invites.map(async invite => {
      let data = {
        code: invite.code,
        presenceCount: invite.presenceCount,
        memberCount: invite.memberCount,
        temporary: invite.temporary,
        maxAge: invite.maxAge,
        uses: invite.uses,
        maxUses: invite.maxUses,
        targetUser: invite.targetUser,
        targetApplication: invite.targetApplication,
        targetType: invite.targetType,
        createdTimestamp: new Date(invite.createdTimestamp),
        expiresTimestamp: invite._expiresTimestamp ? new Date(invite._expiresTimestamp) : null,
        stageInstance: invite.stageInstance,
        guild: {
          connect: {
            id: invite.channel.guildId
          }
        },
        channel: {
          connect: {
            id: invite.channel.id
          }
        },
        inviter: {
          connect: {
            id: invite.inviter?.id
          }
        },
      }
      if(!invite.inviter?.id){
        delete data.inviter
      }
      transaction.push(prismaMedia.invite.upsert({
        where: {
          code: data.code
        },
        update: data,
        create: data,
      }));
    });

    // const stickers = await g.stickers.fetch();
    // stickers.map(sticker => {
    //   // TODO:
    //   console.log(sticker);
    // });

    // const bans = await g.bans.fetch();
    // bans.map(ban => {
    //   // TODO:
    //   console.log(ban);
    // });

    await prismaMedia.$transaction(transaction);
  }));
  
  console.log('Database seeded.');
}

module.exports = seed;