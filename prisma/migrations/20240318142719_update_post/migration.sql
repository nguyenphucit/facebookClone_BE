/*
  Warnings:

  - Added the required column `something` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "something" TEXT NOT NULL;
