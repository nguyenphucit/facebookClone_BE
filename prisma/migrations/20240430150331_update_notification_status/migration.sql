-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('UNSEEN', 'SEEN');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'UNSEEN';
