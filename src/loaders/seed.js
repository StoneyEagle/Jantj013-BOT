const { prismaMedia } = require("../config/database");
/**
 *
 * @param {import('discord.js').Client} client
 */
const seed = async (client) => {
	const transaction = [];
	
	for (const g of client.guilds.cache) {
		const guild = g[1];
		
		const data = {
			id: guild.id,
			name: guild.name,
			icon: guild.icon,
			features: JSON.stringify(guild.features),
			available: guild.available,
			shardId: guild.shardId,
			splash: guild.splash,
			banner: guild.banner,
			description: guild.description || "",
			verificationLevel: guild.verificationLevel,
			vanityURLCode: guild.vanityURLCode,
			nsfwLevel: guild.nsfwLevel,
			discoverySplash: guild.discoverySplash,
			memberCount: guild.memberCount,
			large: guild.large,
			applicationId: guild.applicationId,
			afkTimeout: guild.afkTimeout,
			afkChannelId: guild.afkChannelId,
			systemChannelId: guild.systemChannelId,
			premiumTier: guild.premiumTier,
			premiumSubscriptionCount: guild.premiumSubscriptionCount,
			explicitContentFilter: guild.explicitContentFilter,
			mfaLevel: guild.mfaLevel,
			joinedTimestamp: new Date(guild.joinedTimestamp),
			defaultMessageNotifications: guild.defaultMessageNotifications,
			// systemChannelFlags: [SystemChannelFlags],
			maximumMembers: guild.maximumMembers,
			maximumPresences: guild.maximumPresences,
			approximateMemberCount: guild.approximateMemberCount,
			approximatePresenceCount: guild.approximatePresenceCount,
			vanityURLUses: guild.vanityURLUses,
			rulesChannelId: guild.rulesChannelId,
			publicUpdatesChannelId: guild.publicUpdatesChannelId,
			preferredLocale: guild.preferredLocale,
			ownerId: guild.ownerId,
		};

		transaction.push(
			prismaMedia.guild.upsert({
				where: {
					id: data.id,
				},
				update: data,
				create: data,
			})
		);

		const channels = await guild.channels.fetch();
		for (const c of channels) {
			const channel = c[1];

			const data = {
				type: channel.type,
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
						id: guild.id,
					},
				},
			};
			transaction.push(
				prismaMedia.channel.upsert({
					where: {
						id: data.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const roles = await guild.roles.fetch();
		for (const r of roles) {
			const role = r[1];

			const data = {
				id: role.id,
				name: role.name.match(/[\w\d\s_\.-]+/g)[0],
				displayName: role.name,
				rawPosition: parseInt(role.rawPosition),
				color: parseInt(role.color),
				hoist: role.hoist,
				managed: role.managed,
				mentionable: role.mentionable,
				icon: role.icon,
				tags: JSON.stringify(role.tags),
				permissions: role.permissions.toString(),
				guild: {
					connect: {
						id: role.guild.id,
					},
				},
			};
			transaction.push(
				prismaMedia.role.upsert({
					where: {
						id: data.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const users = await guild.members.fetch();
		for (const u of users) {
			const user = u[1];

			const data = {
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
						id: user.guild.id,
					},
				},
				role: {
					connect: user._roles.map((r) => {
						return {
							id: r,
						};
					}),
				},
			};
			transaction.push(
				prismaMedia.user.upsert({
					where: {
						id: data.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const emojis = await guild.emojis.fetch();
		for (const e of emojis) {
			const emoji = e[1];

			const data = {
				animated: emoji.animated,
				name: emoji.name,
				id: emoji.id,
				requiresColons: emoji.requiresColons,
				managed: emoji.managed,
				available: emoji.available,
				roles: JSON.stringify(emoji._roles),
				guild: {
					connect: {
						id: emoji.guild.id,
					},
				},
			};
			transaction.push(
				prismaMedia.emoji.upsert({
					where: {
						id: data.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const voiceStates = guild.voiceStates.cache;
		for (const vs of voiceStates) {
			const voiceState = vs[1];

			console.log(voiceState);
		}

		const commands = await guild.commands.fetch();
		for (const c of commands) {
			const command = c[1];

			const data = {
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
						id: command.guild.id,
					},
				},
			};
			transaction.push(
				prismaMedia.command.upsert({
					where: {
						id: data.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const invites = await guild.invites.fetch();
		for (const i of invites) {
			const invite = i[1];

			const data = {
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
				expiresTimestamp: invite._expiresTimestamp
					? new Date(invite._expiresTimestamp)
					: null,
				stageInstance: invite.stageInstance,
				guild: {
					connect: {
						id: invite.channel.guildId,
					},
				},
				channel: {
					connect: {
						id: invite.channel.id,
					},
				},
				inviter: {
					connect: {
						id: invite.inviter?.id,
					},
				},
			};
			if (!invite.inviter?.id) {
				delete data.inviter;
			}
			transaction.push(
				prismaMedia.invite.upsert({
					where: {
						code: data.code,
					},
					update: data,
					create: data,
				})
			);
		}

		const stickers = await guild.stickers.fetch();
		for (const s of stickers) {
			const sticker = s[1];

			const data = {
				guildId: {
					connect: {
						id: sticker.id,
					},
				},
			};
			transaction.push(
				prismaMedia.sticker.upsert({
					where: {
						id: sticker.id,
					},
					update: data,
					create: data,
				})
			);
		}

		const bans = await guild.bans.fetch();
		for (const b of bans) {
			const ban = b[1];

			const data = {
				guildId: {
					connect: {
						id: ban.id,
					},
				},
			};
			transaction.push(
				prismaMedia.ban.upsert({
					where: {
						id: ban.id,
					},
					update: data,
					create: data,
				})
			);
		}

	}
	await prismaMedia.$transaction(transaction);
	
	console.log("Database seeded.");
};

module.exports = seed;
