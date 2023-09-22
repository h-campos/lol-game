/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Games_userId_key" ON "Games"("userId");
