import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  try {
    await prisma.category.createMany({
      data: [
        { name: 'Category 1' },
        { name: 'Category 2' },
        { name: 'Category 3' },
        { name: 'Category 4' },
      ],
    });
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
}

async function seedDomains() {
  try {
    await prisma.domain.createMany({
      data: [
        { name: 'Domain 1' },
        { name: 'Domain 2' },
        { name: 'Domain 3' },
        { name: 'Domain 4' },
      ],
    });
    console.log('Domains seeded successfully');
  } catch (error) {
    console.error('Error seeding domains:', error);
  }
}

async function seedTitles() {
  try {
    await prisma.title.createMany({
      data: [
        { name: 'Title 1' },
        { name: 'Title 2' },
        { name: 'Title 3' },
        { name: 'Title 4' },
      ],
    });
    console.log('Titles seeded successfully');
  } catch (error) {
    console.error('Error seeding titles:', error);
  }
}

async function seedPaths() {
  try {
    await prisma.path.createMany({
      data: [{ name: '/' }],
    });
    console.log('Paths seeded successfully');
  } catch (error) {
    console.error('Error seeding paths:', error);
  }
}

async function seedPages() {
  try {
    await prisma.page.createMany({
      data: [
        {
          titleId: 1,
          description: 'Description for Page 1',
          content: 'Content for Page 1',
          activated: true,
          domainId: 1, // Assuming Domain with ID 1 exists
          categoryId: 1, // Assuming Category with ID 1 exists
          pathId: 1, // Assuming Path with ID 1 exists
        },
        {
          titleId: 2,
          description: 'Description for Page 2',
          content: 'Content for Page 2',
          activated: true,
          domainId: 2, // Assuming Domain with ID 2 exists
          categoryId: 2, // Assuming Category with ID 2 exists
          pathId: 1, // Assuming Path with ID 1 exists
        },
        {
          titleId: 3,
          description: 'Description for Page 3',
          content: 'Content for Page 3',
          activated: false,
          domainId: 3, // Assuming Domain with ID 3 exists
          categoryId: 3, // Assuming Category with ID 3 exists
          pathId: 1, // Assuming Path with ID 1 exists
        },
      ],
    });
    console.log('Pages seeded successfully');
  } catch (error) {
    console.error('Error seeding pages:', error);
  }
}

async function rollbackDatabase() {
  try {
    await prisma.page.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.domain.deleteMany({});
    await prisma.title.deleteMany({});
    await prisma.path.deleteMany({});
    await prisma.$executeRaw`ALTER TABLE pages AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE domains AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE categories AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE titles AUTO_INCREMENT = 1`;
    await prisma.$executeRaw`ALTER TABLE paths AUTO_INCREMENT = 1`;

    console.log('Database rolled back successfully');
  } catch (error) {
    console.error('Error rolling back database:', error);
  }
}

async function seedDatabase() {
  await rollbackDatabase();
  await seedCategories();
  await seedDomains();
  await seedTitles();
  await seedPaths();
  await seedPages();
  await prisma.$disconnect();
}

seedDatabase();
