/*
  Warnings:

  - You are about to drop the column `deleted` on the `Emoji` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emoji" (
    "animated" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "requiresColons" BOOLEAN NOT NULL,
    "managed" BOOLEAN NOT NULL,
    "available" BOOLEAN NOT NULL,
    "roles" TEXT NOT NULL
);
INSERT INTO "new_Emoji" ("animated", "available", "id", "managed", "name", "requiresColons", "roles") SELECT "animated", "available", "id", "managed", "name", "requiresColons", "roles" FROM "Emoji";
DROP TABLE "Emoji";
ALTER TABLE "new_Emoji" RENAME TO "Emoji";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
