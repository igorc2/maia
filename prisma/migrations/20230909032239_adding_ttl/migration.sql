/*
  Warnings:

  - Added the required column `ttl` to the `AccessToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ttl" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AccessToken" ("id", "token", "updatedAt", "userId") SELECT "id", "token", "updatedAt", "userId" FROM "AccessToken";
DROP TABLE "AccessToken";
ALTER TABLE "new_AccessToken" RENAME TO "AccessToken";
CREATE UNIQUE INDEX "AccessToken_token_key" ON "AccessToken"("token");
CREATE UNIQUE INDEX "AccessToken_userId_key" ON "AccessToken"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
