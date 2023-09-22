/*
  Warnings:

  - A unique constraint covering the columns `[gameName]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Games_gameName_key" ON "Games"("gameName");
