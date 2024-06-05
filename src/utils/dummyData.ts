import { faker } from "@faker-js/faker";
import type { Genre, ShowType } from "@prisma/client";
import { getRandomYear } from "./date";
import { getRandomGenres } from "./genre";
import { getRandomShowType } from "./showType";
import { capitalizeEachWord } from "./string";

export function getBandName() {
  const animal = faker.animal.type();
  const color = faker.color.human();

  if (Math.random() > 0.5) {
    return capitalizeEachWord(animal);
  }

  return capitalizeEachWord(`${color} ${animal}`);
}

export function getShowName() {
  const fuel = faker.vehicle.fuel();
  const productMaterial = faker.commerce.productMaterial();

  if (Math.random() > 0.5) {
    return capitalizeEachWord(productMaterial);
  }

  return capitalizeEachWord(`${fuel} ${productMaterial}`);
}

export function getBands() {
  const bands = new Map();
  const NUMBER_OF_BANDS = 20;

  while (bands.size < NUMBER_OF_BANDS) {
    const name = getBandName();

    if (bands.has(name)) continue;

    const band = {
      name,
      bio: faker.lorem.lines({ min: 2, max: 4 }),
      genre: getRandomGenres(),
      foundedYear: getRandomYear(),
      country: faker.location.country(),
    };

    bands.set(band.name, band);
  }

  return Array.from(bands.values()) as {
    name: string;
    bio: string;
    genre: Genre[];
    foundedYear: number;
    country: string;
  }[];
}

export function getShows() {
  const shows = new Map();
  const NUMBER_OF_SHOWS = 30;

  while (shows.size < NUMBER_OF_SHOWS) {
    const name = getShowName();

    if (shows.has(name)) continue;

    const show = {
      name,
      date: faker.date.future(),
      showType: getRandomShowType(),
      location: {
        city: faker.location.city(),
        country: faker.location.country(),
      },
    };

    shows.set(show.name, show);
  }

  return Array.from(shows.values()) as {
    name: string;
    date: string;
    showType: ShowType;
    location: { city: string; country: string };
  }[];
}

export function getBandShows(bandIds: string[], showIds: string[]) {
  const bandShow = new Map();
  const MAX_NUMBER_OF_BANDS_PER_SHOW = 3;

  showIds.forEach((showId) => {
    const randomBandIds = [...bandIds].sort(() => Math.random() - 0.5);
    const randomBandsPerShowCount =
      Math.floor(Math.random() * MAX_NUMBER_OF_BANDS_PER_SHOW) + 1;
    const randomBands = randomBandIds.slice(0, randomBandsPerShowCount);

    randomBands.forEach((bandId) => {
      bandShow.set(Symbol(showId), { bandId, showId });
    });
  });

  return Array.from(bandShow.values()) as { bandId: string; showId: string }[];
}
