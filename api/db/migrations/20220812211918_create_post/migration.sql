/*
  Warnings:

  - You are about to drop the column `myLanguage` on the `Post` table. All the data in the column will be lost.
  - Added the required column `codeLanguage` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "codeLanguage" TEXT NOT NULL,
    "codeSnippet" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Post" ("codeSnippet", "createdAt", "explanation", "id", "title") SELECT "codeSnippet", "createdAt", "explanation", "id", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
