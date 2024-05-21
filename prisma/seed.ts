import { PrismaClient } from "@prisma/client";
import { bands } from "./development/bands";

const prisma = new PrismaClient();

async function main() {
  await prisma.band.deleteMany();
  for (const b of bands) {
    await prisma.band.create({
      data: {
        name: b.name,
        bio: b.bio,
        genre: b.genre,
      },
    });
  }
}
main()
  .catch(async (e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
