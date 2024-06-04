import type { api } from "~/trpc/server";
import PageTitle from "../PageTitle";
import Card from "../band/Card";

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
      <div className="flex flex-wrap justify-center gap-6">
        {show.bandShows.map(({ band }) => (
          <Card key={band.id} band={band} />
        ))}
      </div>
    </div>
  );
}
