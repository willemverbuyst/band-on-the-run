import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

const seedDB = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataPath = path.join(process.cwd(), "prisma/development/bands.json");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    await prisma.band.deleteMany();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await prisma.band.createMany({ data });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

await seedDB();
