"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatDate } from "~/lib/date";
import { showTypes } from "~/lib/showType";
import { type api } from "~/trpc/server";

export default function ShowOverview({
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
    const bands = show.bandShows.map((bs) => bs.band.name.toLowerCase());

    return [showName, city, country, ...bands].some((i) =>
      i.includes(searchString),
    );
  }

  const filteredShows = [...shows]
    .filter(filterOnType)
    .filter(filterOnGenre)
    .filter(filterOnSearch);

  return shows.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Bands</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredShows.map((show) => (
          <TableRow key={show.id}>
            <TableCell>{formatDate(show.date)}</TableCell>
            <TableCell>
              <Link
                className="cursor-pointer hover:underline"
                href={`/shows/${show.id}`}
              >
                {show.name}
              </Link>
            </TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{show.location.city}</TableCell>
            <TableCell>{show.location.country}</TableCell>
            <TableCell>{show.showType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="text-center">No shows scheduled</div>
  );
}
