"use client";

import { useSearchParams } from "next/navigation";
import { type api } from "~/trpc/server";
import Card from "./Card";

export default function Overview({
  bands,
}: {
  bands: Awaited<ReturnType<typeof api.band.getAll>>;
}) {
  const searchParams = useSearchParams();
  const genreSearchParam = searchParams.get("genre");
  const genres = genreSearchParam?.split(",") ?? [];

  const bandsFilteredByGenre = bands.filter((band) => {
    if (!genres.length) return true;
    return band.genre.some((g) => genres.includes(g));
  });

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {bandsFilteredByGenre.map((band) => (
        <Card key={band.id} band={band} />
      ))}
    </div>
  );
}
