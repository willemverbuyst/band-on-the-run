import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { getRandomYear } from "~/utils/date";
import { getBandName, getShowName } from "~/utils/dummyData";
import { getRandomGenres } from "~/utils/genre";
import { getRandomShowType } from "~/utils/showType";

const prisma = new PrismaClient();

async function createBands() {
  const bandIds: string[] = [];
  const bands = new Map();
  const NUMBER_OF_BANDS = 20;
  const bandCreationPromises = [];

  while (bands.size < NUMBER_OF_BANDS) {
    const name = getBandName();

    if (bands.has(name)) continue;

    bands.set(name, name);

    const bandPromise = prisma.band
      .create({
        data: {
          name,
          bio: faker.lorem.lines({ min: 2, max: 4 }),
          genre: getRandomGenres(),
          foundedYear: getRandomYear(),
          country: faker.location.country(),
        },
      })
      .then((band) => {
        bandIds.push(band.id);
      });

    bandCreationPromises.push(bandPromise);
  }

  await Promise.all(bandCreationPromises);

  return bandIds;
}

async function createShows() {
  const showIds: string[] = [];
  const shows = new Map();
  const NUMBER_OF_SHOWS = 30;
  const showCreationPromises = [];

  while (shows.size < NUMBER_OF_SHOWS) {
    const name = getShowName();

    if (shows.has(name)) continue;

    shows.set(name, name);

    const showPromise = prisma.show
      .create({
        data: {
          name,
          date: faker.date.future(),
          showType: getRandomShowType(),
          location: {
            city: faker.location.city(),
            country: faker.location.country(),
          },
        },
      })
      .then((show) => {
        showIds.push(show.id);
      });

    showCreationPromises.push(showPromise);
  }

  await Promise.all(showCreationPromises);

  return showIds;
}

async function assignBandsToShows(showIds: string[], bandIds: string[]) {
  const MAX_NUMBER_OF_BANDS_PER_SHOW = 3;
  const assignments = [];

  for (const showId of showIds) {
    const randomBandIds = [...bandIds].sort(() => Math.random() - 0.5);
    const randomBandsPerShowCount =
      Math.floor(Math.random() * MAX_NUMBER_OF_BANDS_PER_SHOW) + 1;
    const randomBands = randomBandIds.slice(0, randomBandsPerShowCount);

    for (const bandId of randomBands) {
      assignments.push(
        prisma.bandShow.create({
          data: {
            bandId: bandId,
            showId: showId,
          },
        }),
      );
    }
  }

  await Promise.all(assignments);
}

async function main() {
  await prisma.bandShow.deleteMany();
  await prisma.show.deleteMany();
  await prisma.band.deleteMany();

  const bandIds = await createBands();
  const showIds = await createShows();

  await assignBandsToShows(showIds, bandIds);
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
