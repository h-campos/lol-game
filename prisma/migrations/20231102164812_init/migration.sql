-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "mail" TEXT NOT NULL DEFAULT 'anonymous',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'To be reviewed',
ADD COLUMN     "userId" TEXT NOT NULL DEFAULT 'anonymous',
ADD COLUMN     "username" TEXT NOT NULL DEFAULT 'anonymous',
ALTER COLUMN "message" SET DEFAULT 'No message';
