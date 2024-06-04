import { Genre } from "@prisma/client";

export const genres = [
  Genre.ALTERNATIVE_ROCK,
  Genre.ELECTRONIC,
  Genre.EXPERIMENTAL,
  Genre.FOLK,
  Genre.FOLK_ROCK,
  Genre.HEAVY_METAL,
  Genre.INDIE_FOLK,
  Genre.INDIE_ROCK,
  Genre.POST_METAL,
  Genre.POST_PUNK,
  Genre.POST_ROCK,
  Genre.POP_ROCK,
  Genre.PROGRESSIVE_METAL,
  Genre.PROGRESSIVE_ROCK,
  Genre.SPACE_ROCK,
  Genre.SYNTH_POP,
  Genre.SYNTH_WAVE,
  Genre.SYMPHONIC_METAL,
  Genre.DREAM_POP,
] as const;

export function getRandomGenres() {
  const randomGenres = [...genres].sort(() => Math.random() - 0.5);
  const randomGenresCount = Math.floor(Math.random() * 3) + 1;
  return randomGenres.slice(0, randomGenresCount);
}
