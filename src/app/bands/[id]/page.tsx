import Link from "next/link";
import GenreBadge from "~/app/_components/GenreBadge";
import PageTitle from "~/app/_components/PageTitle";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const band = await api.band.getOne(params.id);

  if (!band) {
    return <div>Band not found</div>;
  }

  const sortedShows = band.bandShows.sort(
    (a, b) => a.show.date.getTime() - b.show.date.getTime(),
  );

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
        <section className="rounded bg-white/10 py-2">
          <table className="table-auto">
            <thead>
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
                <tr key={show.id} className="cursor-pointer">
                  <td className="px-4 py-2">
                    {show.date.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{show.name}</td>
                  <td className="px-4 py-2">{show.location.city}</td>
                  <td className="px-4 py-2">{show.location.country}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {show.isFestival ? "festival" : "regular show"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="text-center">No shows scheduled</div>
      )}
    </div>
  );
}
