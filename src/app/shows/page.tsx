import { api } from "~/trpc/server";
import PageTitle from "../_components/PageTitle";

export default async function Page() {
  const shows = await api.show.getAll();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title="Shows" />
      {shows.length > 0 ? (
        <section className="rounded bg-white/10 py-2">
          <h3 className="text-center text-2xl font-bold">Tour Dates</h3>
          <table className="table-auto">
            <tbody>
              {shows.map((show) => (
                <tr key={show.id} className="cursor-pointer">
                  <td className="px-4 py-2">
                    {show.date.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{show.name}</td>
                  <td className="px-4 py-2">
                    {show.bandShows.map((bs) => bs.band.name).join(", ")}
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
        </section>
      ) : (
        <div className="text-center">No shows scheduled</div>
      )}
    </div>
  );
}
