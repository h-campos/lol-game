/*
  Warnings:

  - You are about to drop the `ReportProposal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ReportProposal";

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);
