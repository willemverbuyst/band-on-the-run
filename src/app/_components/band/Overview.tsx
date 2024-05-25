"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type api } from "~/trpc/server";
import GenreBadge from "../GenreBadge";

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
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          key={band.id}
          href={`/bands/${band.id}`}
        >
          <h3 className="text-2xl font-bold">{band.name}</h3>
          <p className="line-clamp-2">{band.bio}</p>
          <section className="flex gap-2">
            {band.genre.map((g) => (
              <GenreBadge key={g} genre={g} customStyle="bg-zinc-950" />
            ))}
          </section>
        </Link>
      ))}
    </div>
  );
}
