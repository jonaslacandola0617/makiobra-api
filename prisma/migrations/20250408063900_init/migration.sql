/*
  Warnings:

  - Added the required column `skill` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "skill" VARCHAR(60) NOT NULL;
