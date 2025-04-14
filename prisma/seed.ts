import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const jobsData = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');

console.log(jobsData);

async function main() {
  const count = await prisma.job.createMany({
    data: JSON.parse(jobsData),
  });

  console.log(count);
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect;
    process.exit(1);
  });
