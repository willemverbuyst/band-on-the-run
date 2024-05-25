import { api } from "~/trpc/server";
import GenreFilter from "../_components/GenreFilter";
import PageTitle from "../_components/PageTitle";
import Overview from "../_components/band/Overview";

export default async function Page() {
  const bands = await api.band.getAll();

  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <PageTitle title="Bands" />
      <GenreFilter />
      <Overview bands={bands} />
    </div>
  );
}
