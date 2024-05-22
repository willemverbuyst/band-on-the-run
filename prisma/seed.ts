import { PrismaClient } from "@prisma/client";
import { bands } from "./development/bands";
import { shows } from "./development/shows";

const prisma = new PrismaClient();

async function main() {
  await prisma.show.deleteMany();
  await prisma.band.deleteMany();

  const bandIds: string[] = [];

  for (const b of bands) {
    const band = await prisma.band.create({
      data: {
        name: b.name,
        bio: b.bio,
        genre: b.genre,
        foundedYear: b.foundedYear,
        country: b.country,
      },
    });
    bandIds.push(band.id);
  }

  for (const s of shows.slice(0, 20)) {
    const bandId = bandIds[0];

    if (!s || !bandId) {
      return;
    }
    await prisma.show.create({
      data: {
        name: s.name,
        date: new Date(s.date),
        isFestival: s.isFestival,
        location: s.location,
        bandId,
      },
    });
  }

  for (const s of shows.slice(20)) {
    const bandId = bandIds[1];

    if (!s || !bandId) {
      return;
    }
    await prisma.show.create({
      data: {
        name: s.name,
        date: new Date(s.date),
        isFestival: s.isFestival,
        location: s.location,
        bandId,
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
