"use client";

import { type Genre } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { genres } from "~/lib/genre";

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
        <Badge
          key={genre}
          onClick={() => handleClick(genre)}
          variant={
            searchParams.get("genre")?.toString().split(",").includes(genre)
              ? "default"
              : "outline"
          }
          className="cursor-pointer"
        >
          {genre.replace("_", " ").toLocaleLowerCase()}
        </Badge>
      ))}
      {currentGenres.length > 0 && (
        <Badge
          onClick={clearFilter}
          variant="destructive"
          className="flex cursor-pointer"
        >
          x
        </Badge>
      )}
    </section>
  );
}
