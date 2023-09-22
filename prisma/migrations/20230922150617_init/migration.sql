/*
  Warnings:

  - Added the required column `lastDayPlayed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blurryChampions" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastDayPlayed" TIMESTAMP(3) NOT NULL;
