/*
  Warnings:

  - You are about to drop the column `deleted` on the `Guild` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "features" TEXT NOT NULL,
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
INSERT INTO "new_Guild" ("afkChannelId", "afkTimeout", "applicationId", "approximateMemberCount", "approximatePresenceCount", "available", "banner", "defaultMessageNotifications", "description", "discoverySplash", "explicitContentFilter", "features", "icon", "id", "joinedTimestamp", "large", "maximumMembers", "maximumPresences", "memberCount", "mfaLevel", "name", "nsfwLevel", "ownerId", "preferredLocale", "premiumSubscriptionCount", "premiumTier", "publicUpdatesChannelId", "rulesChannelId", "shardId", "splash", "systemChannelFlags", "systemChannelId", "textChannelId", "vanityURLCode", "vanityURLUses", "verificationLevel") SELECT "afkChannelId", "afkTimeout", "applicationId", "approximateMemberCount", "approximatePresenceCount", "available", "banner", "defaultMessageNotifications", "description", "discoverySplash", "explicitContentFilter", "features", "icon", "id", "joinedTimestamp", "large", "maximumMembers", "maximumPresences", "memberCount", "mfaLevel", "name", "nsfwLevel", "ownerId", "preferredLocale", "premiumSubscriptionCount", "premiumTier", "publicUpdatesChannelId", "rulesChannelId", "shardId", "splash", "systemChannelFlags", "systemChannelId", "textChannelId", "vanityURLCode", "vanityURLUses", "verificationLevel" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
