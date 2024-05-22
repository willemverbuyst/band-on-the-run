import Link from "next/link";
import { api } from "~/trpc/server";
import PageTitle from "../_components/PageTitle";

export default async function Page() {
  const shows = await api.show.getAll();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title="Shows" />
      {shows.length > 0 ? (
        <table className="table-auto bg-white/10 text-left text-xs text-white ">
          <thead className=" uppercase">
            <tr>
              <th className="border-b-2 border-gray-500 px-4 py-2">Date</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Name</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Bands</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">City</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Country</th>
              <th className="border-b-2 border-gray-500 px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.id}>
                <td className="px-4 py-2">{show.date.toLocaleDateString()}</td>
                <td className="px-4 py-2">{show.name}</td>
                <td className="px-4 py-2">
                  {show.bandShows.map((bs, i) => (
                    <>
                      <Link
                        className="cursor-pointer hover:underline"
                        key={bs.band.id}
                        href={`/bands/${bs.band.id}`}
                      >
                        {bs.band.name}
                      </Link>
                      {i < show.bandShows.length - 1 && ", "}
                    </>
                  ))}
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
