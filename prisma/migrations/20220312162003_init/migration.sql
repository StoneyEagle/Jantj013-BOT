/*
  Warnings:

  - You are about to drop the column `deleted` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `Channel` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "color" INTEGER NOT NULL,
    "hoist" BOOLEAN NOT NULL,
    "rawPosition" INTEGER NOT NULL,
    "managed" BOOLEAN NOT NULL,
    "mentionable" BOOLEAN NOT NULL,
    "tags" TEXT,
    "permissions" TEXT NOT NULL
);
INSERT INTO "new_Role" ("color", "displayName", "hoist", "id", "managed", "mentionable", "name", "permissions", "rawPosition", "tags") SELECT "color", "displayName", "hoist", "id", "managed", "mentionable", "name", "permissions", "rawPosition", "tags" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE TABLE "new_Channel" (
    "type" TEXT NOT NULL,
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
INSERT INTO "new_Channel" ("guildId", "id", "lastMessageId", "name", "nsfw", "parentId", "rateLimitPerUser", "rawPosition", "topic", "type") SELECT "guildId", "id", "lastMessageId", "name", "nsfw", "parentId", "rateLimitPerUser", "rawPosition", "topic", "type" FROM "Channel";
DROP TABLE "Channel";
ALTER TABLE "new_Channel" RENAME TO "Channel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
