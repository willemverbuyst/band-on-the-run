"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { type api } from "~/trpc/server";
import GenreBadge from "../GenreBadge";

export default function Overview({
  shows,
}: {
  shows: Awaited<ReturnType<typeof api.show.getAll>>;
}) {
  const searchParams = useSearchParams();
  const genreSearchParam = searchParams.get("genre");
  const genres = genreSearchParam?.split(",") ?? [];

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

  return shows.length > 0 ? (
    <table className="table-auto bg-white/10 text-left text-xs text-white ">
      <thead className="uppercase">
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
            <td className="px-4 py-2">
              <Link
                className="cursor-pointer hover:underline"
                href={`/shows/${show.id}`}
              >
                {show.name}
              </Link>
            </td>
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
  );
}
