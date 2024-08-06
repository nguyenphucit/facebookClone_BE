-- CreateEnum
CREATE TYPE "MessagesStatus" AS ENUM ('UNSEEN', 'SEEN');

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "status" "MessagesStatus" DEFAULT 'UNSEEN';
