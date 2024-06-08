import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { type api } from "~/trpc/server";
import PageTitle from "../page-title";

export default function Details({
  band,
}: {
  band: Awaited<ReturnType<typeof api.band.getOne>>;
}) {
  const sortedShows =
    band?.bandShows.sort(
      (a, b) => a.show.date.getTime() - b.show.date.getTime(),
    ) ?? [];

  if (!band) {
    return <div>Band not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title={band.name} />
      <h3 className="text-center">
        {band.country} - {band.foundedYear}
      </h3>
      <p className="flex max-w-[400px] text-justify">{band.bio}</p>
      <div className="flex justify-around gap-2">
        {band.genre.map((g) => (
          <Link key={g} href={`/bands?genre=${g.replaceAll(" ", "+")}`}>
            <Badge variant="secondary">
              {g.replace("_", " ").toLocaleLowerCase()}
            </Badge>
          </Link>
        ))}
      </div>
      {sortedShows.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedShows.map(({ show }) => (
              <TableRow key={show.id}>
                <TableCell>{show.date.toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link
                    className="cursor-pointer hover:underline"
                    href={`/shows/${show.id}`}
                  >
                    {show.name}
                  </Link>
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
      )}
    </div>
  );
}
