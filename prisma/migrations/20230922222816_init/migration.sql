/*
  Warnings:

  - You are about to drop the column `blurryChampions` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "blurryChampions";

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "gamePath" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
