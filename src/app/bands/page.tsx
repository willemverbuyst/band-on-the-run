import Link from "next/link";
import { api } from "~/trpc/server";
import GenreBadge from "../_components/GenreBadge";
import GenreFilter from "../_components/GenreFilter";
import PageTitle from "../_components/PageTitle";

export default async function Page({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  const genreSearchParam = searchParams?.genre;
  const bands = await api.band.getAll();
  const genres = genreSearchParam?.split(",") ?? [];

  const bandsFilteredByGenre = bands.filter((band) => {
    if (!genres.length) return true;
    return band.genre.some((g) => genres.includes(g));
  });

  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <PageTitle title="Bands" />
      <GenreFilter />
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
    </div>
  );
}
