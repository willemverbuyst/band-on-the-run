import Link from "next/link";
import React from "react";
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
  const genres = genreSearchParam?.split(",") ?? [];
  const shows = await api.show.getAll();

  function getGenres(
    show: Awaited<ReturnType<typeof api.show.getAll>>[number],
  ): string[] {
    const genres = show.bandShows.flatMap((bs) => bs.band.genre);
    return Array.from(new Set(genres)).sort((a, b) => a.localeCompare(b));
  }

  const showsFilteredByGenre = [...shows].filter((show) => {
    if (!genres.length) return true;
    return getGenres(show).some((g) => genres.includes(g));
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title="Shows" />
      <GenreFilter />
      {showsFilteredByGenre.length > 0 ? (
        <table className="table-auto bg-white/10 text-left text-xs text-white ">
          <thead className=" uppercase">
            <tr>
              <th className="border-b-2 border-gray-500 px-4 py-2">Date</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Name</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Bands</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">City</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Country</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Type</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Genre</th>
            </tr>
          </thead>
          <tbody>
            {showsFilteredByGenre.map((show) => (
              <tr key={show.id}>
                <td className="px-4 py-2">{show.date.toLocaleDateString()}</td>
                <td className="px-4 py-2">{show.name}</td>
                <td className="px-4 py-2">
                  {show.bandShows.map((bs, i) => (
                    <React.Fragment key={i}>
                      <Link
                        className="cursor-pointer hover:underline"
                        href={`/bands/${bs.band.id}`}
                      >
                        {bs.band.name}
                      </Link>
                      {i < show.bandShows.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </td>
                <td className="px-4 py-2">{show.location.city}</td>
                <td className="px-4 py-2">{show.location.country}</td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {show.isFestival ? "festival" : "regular show"}
                </td>
                <td className="flex gap-2 px-4 py-2">
                  {getGenres(show).map((g) => (
                    <GenreBadge
                      key={g}
                      genre={g}
                      customStyle="bg-zinc-950 text-xs px-2 py-0"
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No shows scheduled</div>
      )}
    </div>
  );
}
