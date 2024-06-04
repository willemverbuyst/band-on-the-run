import { bands } from "../../prisma/development/bands";

export function getUniqueGenres() {
  const genresFromData = bands.reduce((acc, band) => {
    return [...acc, ...band.genre];
  }, [] as string[]);
  const uniqueGenres = Array.from(new Set(genresFromData));

  return uniqueGenres.sort();
}
