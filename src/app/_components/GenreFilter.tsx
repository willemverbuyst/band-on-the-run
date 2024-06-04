"use client";

import type { Genre } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { genres } from "~/utils/genre";
import GenreBadge from "./GenreBadge";

export default function GenreFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);
  const currentGenres = params.get("genre")?.toString().split(",") ?? [];

  function handleClick(genre: Genre) {
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

  function clearFilter() {
    params.delete("genre");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex flex-wrap justify-center gap-2 md:w-4/12 ">
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleClick(genre)}>
          <GenreBadge
            genre={genre}
            customStyle={
              searchParams.get("genre")?.toString().split(",").includes(genre)
                ? "bg-pink-500"
                : "bg-cyan-500"
            }
          />
        </button>
      ))}
      {currentGenres.length > 0 && (
        <button onClick={clearFilter}>
          <span className="rounded-xl bg-gray-500 px-2 py-1 text-xs">x</span>
        </button>
      )}
    </section>
  );
}
