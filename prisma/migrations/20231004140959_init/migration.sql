/*
  Warnings:

  - You are about to drop the column `timeLeftBlurryChampions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeLeftSpellsGuessing` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "timeLeftBlurryChampions",
DROP COLUMN "timeLeftSpellsGuessing",
ADD COLUMN     "timeLeft" INTEGER NOT NULL DEFAULT 0;
