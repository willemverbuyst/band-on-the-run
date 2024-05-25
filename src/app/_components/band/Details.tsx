import Link from "next/link";
import { type api } from "~/trpc/server";
import GenreBadge from "../GenreBadge";
import PageTitle from "../PageTitle";

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
            <GenreBadge genre={g} customStyle="bg-cyan-500" />
          </Link>
        ))}
      </div>
      {sortedShows.length > 0 ? (
        <table className="table-auto bg-white/10 text-left text-xs text-white ">
          <thead className="uppercase">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Country</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {sortedShows.map(({ show }) => (
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
                <td className="px-4 py-2">{show.location.city}</td>
                <td className="px-4 py-2">{show.location.country}</td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {show.isFestival ? "festival" : "regular show"}
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
