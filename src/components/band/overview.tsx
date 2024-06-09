"use client";

import { useSearchParams } from "next/navigation";
import { type api } from "~/trpc/server";
import BandCard from "../band-card";

export default function Overview({
  bands,
}: {
  bands: Awaited<ReturnType<typeof api.band.getAll>>;
}) {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");
  const searchParam = searchParams.get("search");
  const genres = genreParam?.split(",") ?? [];

  const filteredBands = bands.filter((band) => {
    if (!genres.length && !searchParam) {
      return true;
    }

    const searchString = searchParam?.toLowerCase() ?? "";
    const bandName = band.name.toLowerCase();
    const bandBio = band.bio?.toLowerCase() ?? "";
    const bandGenres = band.genre.map((g) => g.toLowerCase());
    if (!genres.length) {
      return (
        bandName.includes(searchString) ||
        bandBio.includes(searchString) ||
        bandGenres.includes(searchString)
      );
    }

    return (
      band.genre.some((g) => genres.includes(g)) &&
      (bandName.includes(searchString) ||
        bandBio.includes(searchString) ||
        bandGenres.includes(searchString))
    );
  });

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {filteredBands.map((band) => (
        <BandCard key={band.id} band={band} />
      ))}
    </div>
  );
}
