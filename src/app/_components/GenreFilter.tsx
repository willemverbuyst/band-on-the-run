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
    if (!params.get("genre")?.toString()) {
      params.set("genre", genre);
    } else if (!params.get("genre")?.toString().includes(genre)) {
      const genres = params.get("genre")?.toString().split(",") ?? [];
      params.set("genre", `${[...genres, genre].join(",")}`);
    } else if (params.get("genre")?.toString().includes(genre)) {
      const genres = params.get("genre")?.toString().split(",") ?? [];
      const index = genres.indexOf(genre);
      const updatedGenres = genres.filter((_, i) => i !== index);
      updatedGenres.length
        ? params.set("genre", `${updatedGenres.join(",")}`)
        : params.delete("genre");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex max-w-96 flex-wrap justify-center gap-2">
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
