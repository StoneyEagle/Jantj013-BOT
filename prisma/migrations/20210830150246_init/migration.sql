-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "discriminator" TEXT NOT NULL,
    "public_flags" INTEGER NOT NULL,
    "mute" BOOLEAN NOT NULL,
    "deaf" BOOLEAN NOT NULL,
    "nick" TEXT,
    "premium_since" DATETIME,
    "joined_at" DATETIME NOT NULL,
    "is_pending" BOOLEAN NOT NULL DEFAULT false,
    "pending" BOOLEAN NOT NULL DEFAULT false,
    "bot" BOOLEAN NOT NULL DEFAULT false,
    "banned_at" DATETIME,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "hoist" BOOLEAN NOT NULL,
    "rawPosition" INTEGER NOT NULL,
    "managed" BOOLEAN NOT NULL,
    "mentionable" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "tags" TEXT,
    "permissions" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "features" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "available" BOOLEAN NOT NULL,
    "shardId" INTEGER NOT NULL,
    "splash" TEXT,
    "banner" TEXT,
    "description" TEXT NOT NULL,
    "verificationLevel" TEXT NOT NULL,
    "vanityURLCode" TEXT,
    "nsfwLevel" TEXT NOT NULL,
    "discoverySplash" TEXT,
    "memberCount" INTEGER NOT NULL,
    "large" BOOLEAN NOT NULL,
    "applicationId" TEXT,
    "afkTimeout" INTEGER NOT NULL,
    "afkChannelId" TEXT,
    "systemChannelId" TEXT,
    "premiumTier" TEXT NOT NULL,
    "premiumSubscriptionCount" INTEGER NOT NULL,
    "explicitContentFilter" TEXT NOT NULL,
    "mfaLevel" TEXT NOT NULL,
    "joinedTimestamp" DATETIME NOT NULL,
    "defaultMessageNotifications" TEXT NOT NULL,
    "systemChannelFlags" INTEGER NOT NULL DEFAULT 0,
    "maximumMembers" INTEGER NOT NULL,
    "maximumPresences" INTEGER,
    "approximateMemberCount" INTEGER,
    "approximatePresenceCount" INTEGER,
    "vanityURLUses" TEXT,
    "rulesChannelId" TEXT,
    "publicUpdatesChannelId" TEXT,
    "preferredLocale" TEXT NOT NULL,
    "ownerId" TEXT,
    "textChannelId" TEXT
);

-- CreateTable
CREATE TABLE "Command" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "applicationId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "defaultPermission" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Channel" (
    "type" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "guildId" TEXT NOT NULL,
    "parentId" TEXT,
    "nsfw" BOOLEAN NOT NULL DEFAULT true,
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rawPosition" INTEGER NOT NULL,
    "topic" TEXT,
    "lastMessageId" TEXT,
    "rateLimitPerUser" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "VoiceState" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "StageInstance" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Invite" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "presenceCount" INTEGER,
    "memberCount" INTEGER,
    "temporary" BOOLEAN NOT NULL,
    "maxAge" INTEGER NOT NULL,
    "uses" INTEGER NOT NULL,
    "maxUses" INTEGER NOT NULL,
    "targetUser" TEXT,
    "targetApplication" TEXT,
    "targetType" TEXT,
    "createdTimestamp" DATETIME NOT NULL,
    "expiresTimestamp" DATETIME,
    "stageInstance" TEXT
);

-- CreateTable
CREATE TABLE "Emoji" (
    "animated" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "requiresColons" BOOLEAN NOT NULL,
    "managed" BOOLEAN NOT NULL,
    "available" BOOLEAN NOT NULL,
    "roles" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Stickers" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InviteToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Invite" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CommandToGuild" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Command" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ChannelToGuild" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BanToGuild" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Ban" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToVoiceState" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "VoiceState" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToStageInstance" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "StageInstance" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToInvite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Invite" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EmojiToGuild" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Emoji" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GuildToStickers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Stickers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ChannelToInvite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Invite" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InviteToUser_AB_unique" ON "_InviteToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_InviteToUser_B_index" ON "_InviteToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToUser_AB_unique" ON "_GuildToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToUser_B_index" ON "_GuildToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToRole_AB_unique" ON "_GuildToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToRole_B_index" ON "_GuildToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommandToGuild_AB_unique" ON "_CommandToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_CommandToGuild_B_index" ON "_CommandToGuild"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToGuild_AB_unique" ON "_ChannelToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToGuild_B_index" ON "_ChannelToGuild"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BanToGuild_AB_unique" ON "_BanToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_BanToGuild_B_index" ON "_BanToGuild"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToVoiceState_AB_unique" ON "_GuildToVoiceState"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToVoiceState_B_index" ON "_GuildToVoiceState"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToStageInstance_AB_unique" ON "_GuildToStageInstance"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToStageInstance_B_index" ON "_GuildToStageInstance"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToInvite_AB_unique" ON "_GuildToInvite"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToInvite_B_index" ON "_GuildToInvite"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EmojiToGuild_AB_unique" ON "_EmojiToGuild"("A", "B");

-- CreateIndex
CREATE INDEX "_EmojiToGuild_B_index" ON "_EmojiToGuild"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToStickers_AB_unique" ON "_GuildToStickers"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToStickers_B_index" ON "_GuildToStickers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToInvite_AB_unique" ON "_ChannelToInvite"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToInvite_B_index" ON "_ChannelToInvite"("B");
