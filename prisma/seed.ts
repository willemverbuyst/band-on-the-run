import { PrismaClient } from "@prisma/client";
import { bands } from "./development/bands";
import { shows } from "./development/shows";

const prisma = new PrismaClient();

async function main() {
  await prisma.bandShow.deleteMany();
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

  const showIds: string[] = [];
  for (const s of shows) {
    const show = await prisma.show.create({
      data: {
        name: s.name,
        date: new Date(s.date),
        isFestival: s.isFestival,
        location: s.location,
      },
    });
    showIds.push(show.id);
  }

  for (let i = 0; i < 50; i++) {
    const bandShow = new Set();
    const randomBandId = bandIds.sort(() => Math.random() - 0.5)[0] ?? "";
    const randomShowId = showIds.sort(() => Math.random() - 0.5)[0] ?? "";

    // to prevent duplicate shows for a band
    if (bandShow.has(`${randomBandId}-${randomShowId}`)) {
      return;
    } else {
      bandShow.add(`${randomBandId}-${randomShowId}`);
      await prisma.bandShow.create({
        data: {
          bandId: randomBandId,
          showId: randomShowId,
        },
      });
    }
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
