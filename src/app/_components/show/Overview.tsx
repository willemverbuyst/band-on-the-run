"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import type { api } from "~/trpc/server";
import { formatDate } from "~/utils/date";
import { showTypes } from "~/utils/showType";

export default function Overview({
  shows,
}: {
  shows: Awaited<ReturnType<typeof api.show.getAll>>;
}) {
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre")?.split(",") ?? [];
  const searchParam = searchParams.get("search");
  const showTypeParam = searchParams.get("showType")?.split(",") ?? [];

  function getGenresOfShow(
    show: Awaited<ReturnType<typeof api.show.getAll>>[number],
  ): string[] {
    const genres = show.bandShows.flatMap((bs) => bs.band.genre);
    return Array.from(new Set(genres)).sort((a, b) => a.localeCompare(b));
  }

  function filterOnType(
    show: Awaited<ReturnType<typeof api.show.getAll>>[number],
  ) {
    if (showTypeParam.length === 0) {
      return false;
    }

    if (showTypeParam.length === showTypes.length) {
      return true;
    }

    if (showTypeParam.includes(show.showType)) {
      return true;
    }

    return false;
  }

  function filterOnGenre(
    show: Awaited<ReturnType<typeof api.show.getAll>>[number],
  ) {
    if (genreParam.length === 0) {
      return true;
    }

    return getGenresOfShow(show).some((g) => genreParam.includes(g));
  }

  function filterOnSearch(
    show: Awaited<ReturnType<typeof api.show.getAll>>[number],
  ) {
    const searchString = searchParam?.toLowerCase() ?? "";
    const showName = show.name.toLowerCase();
    const city = show.location.city.toLowerCase();
    const country = show.location.country.toLowerCase();

    return [showName, city, country].some((i) => i.includes(searchString));
  }

  const filteredShows = [...shows]
    .filter(filterOnType)
    .filter(filterOnGenre)
    .filter(filterOnSearch);

  return shows.length > 0 ? (
    <table className="table-fixed bg-white/10 text-left text-xs text-white ">
      <thead className="uppercase">
        <tr>
          <th className="w-1/7 border-b-2 border-gray-500 px-4 py-2">Date</th>
          <th className="w-1/7 border-b-2 border-gray-500 px-4 py-2">Name</th>
          <th className="w-2/7 border-b-2 border-gray-500 px-4 py-2">Bands</th>
          <th className="w-1/7 border-b-2 border-gray-500 px-4 py-2">City</th>
          <th className="w-1/7 border-b-2 border-gray-500 px-4 py-2">
            Country
          </th>
          <th className="w-1/7 border-b-2 border-gray-500 px-4 py-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {filteredShows.map((show) => (
          <tr key={show.id}>
            <td className="px-4 py-2">{formatDate(show.date)}</td>
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
            <td className="px-4 py-2 text-xs text-gray-500">{show.showType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-center">No shows scheduled</div>
  );
}
