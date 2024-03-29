import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function hasDomainsTable() {
  try {
    await prisma.$connect();
    await prisma.domain.findMany(); // Try to query the Domain table
    await prisma.$disconnect();
    return true; // If no error, the Domain table exists
  } catch (error) {
    return false; // If an error occurs, the Domain table does not exist
  }
}

async function main() {
  const hasTable = await hasDomainsTable();
  console.log(`Database has domains table: ${hasTable}`);
}

main()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
