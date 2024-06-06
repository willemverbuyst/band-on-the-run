import { formatDate } from "~/lib/date";
import type { api } from "~/trpc/server";
import BandCard from "../band-card";
import PageTitle from "../page-title";

export default function Details({
  show,
}: {
  show: Awaited<ReturnType<typeof api.show.getOne>>;
}) {
  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title={show.name} />
      <h3 className="text-center">{formatDate(show.date)}</h3>
      <h3 className="text-center">
        {show.location.city} - {show.location.country}
      </h3>
      <h4 className="text-gray-500">{show.showType}</h4>
      <div className="flex flex-wrap justify-center gap-6">
        {show.bandShows.map(({ band }) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </div>
  );
}
