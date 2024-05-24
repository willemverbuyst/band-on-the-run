"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { bands } from "../../../prisma/development/bands";
import GenreBadge from "./GenreBadge";

export default function GenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const genres = bands.reduce((acc, band) => {
    return [...acc, ...band.genre];
  }, [] as string[]);
  const uniqueGenres = Array.from(new Set(genres));

  function handleClick(genre: string) {
    const params = new URLSearchParams(searchParams);
    const currentGenres = params.get("genre")?.toString().split(",") ?? [];

    if (!currentGenres.includes(genre)) {
      currentGenres.push(genre);
    } else {
      const index = currentGenres.indexOf(genre);
      currentGenres.splice(index, 1);
    }

    if (currentGenres.length) {
      params.set("genre", currentGenres.join(","));
    } else {
      params.delete("genre");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex flex-wrap justify-center gap-2 md:w-4/12 ">
      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={() => handleClick(genre)}>
          <GenreBadge
            genre={genre}
            customStyle={
              searchParams.get("genre")?.toString().includes(genre)
                ? "bg-pink-500"
                : "bg-cyan-500"
            }
          />
        </button>
      ))}
    </section>
  );
}
