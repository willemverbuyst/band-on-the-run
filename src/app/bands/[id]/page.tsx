import { type Show } from "@prisma/client";
import PageTitle from "~/app/_components/PageTitle";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const band = await api.band.getOne(params.id);

  if (!band) {
    return <div>Band not found</div>;
  }

  const shows = band.shows?.length ? band.shows : [];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title={band.name} />
      <h3 className="text-center">
        {band.country} - {band.foundedYear}
      </h3>
      <p className="flex max-w-[400px] text-justify">{band.bio}</p>
      <div className="flex justify-around gap-2">
        {band.genre.map((g) => (
          <span className="rounded-xl bg-sky-500 px-3 py-1" key={g}>
            {g}
          </span>
        ))}
      </div>
      <section className="rounded bg-white/10 py-2">
        <h3 className="text-center text-2xl font-bold">Tour Dates</h3>
        <table className="table-auto">
          <tbody>
            {shows.map((show: Show) => (
              <tr key={show.id} className="cursor-pointer">
                <td className="px-4 py-2">{show.date.toLocaleDateString()}</td>
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
    </div>
  );
}
