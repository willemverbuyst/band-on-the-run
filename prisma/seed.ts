import { PrismaClient } from "@prisma/client";
import { getBandShows, getBands, getShows } from "~/utils/dummyData";

const prisma = new PrismaClient();

async function main() {
  await prisma.bandShow.deleteMany();
  await prisma.show.deleteMany();
  await prisma.band.deleteMany();

  const bandIds: string[] = [];
  const bands = getBands();

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
  const shows = getShows();

  for (const s of shows) {
    const show = await prisma.show.create({
      data: {
        name: s.name,
        date: s.date,
        showType: s.showType,
        location: s.location,
      },
    });
    showIds.push(show.id);
  }

  const bandShows = getBandShows(bandIds, showIds);

  for (const bs of bandShows) {
    await prisma.bandShow.create({
      data: {
        bandId: bs.bandId,
        showId: bs.showId,
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
