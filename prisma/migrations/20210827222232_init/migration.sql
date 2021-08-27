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
    "permissions" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "hoist" BOOLEAN NOT NULL,
    "managed" BOOLEAN NOT NULL,
    "mentionable" BOOLEAN NOT NULL,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "RoleOnUser" (
    "roleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("roleId", "userId"),
    FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
