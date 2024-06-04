import { faker } from "@faker-js/faker";
import type { Genre } from "@prisma/client";
import { getRandomYear } from "./date";
import { getRandomGenres } from "./genre";
import { capitalizeEachWord } from "./string";

export function getName() {
  const animal = faker.animal.type();
  const color = faker.color.human();

  if (Math.random() > 0.5) {
    return capitalizeEachWord(animal);
  }

  return capitalizeEachWord(`${color} ${animal}`);
}

export function getBands() {
  const bands = new Map();

  while (bands.size < 10) {
    const name = getName();

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
