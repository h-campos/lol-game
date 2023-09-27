-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "spellsGuessingScore" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
