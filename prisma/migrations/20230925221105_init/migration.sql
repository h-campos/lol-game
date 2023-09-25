/*
  Warnings:

  - Made the column `blurryChampionsScore` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "blurryChampionsScore" SET NOT NULL,
ALTER COLUMN "blurryChampionsScore" SET DEFAULT 0;
