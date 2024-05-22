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
        foundedYear: b.foundedYear,
        country: b.country,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
