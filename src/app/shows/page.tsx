import { api } from "~/trpc/server";
import GenreFilter from "../_components/GenreFilter";
import PageTitle from "../_components/PageTitle";
import ShowsOverview from "../_components/ShowsOverview";

export default async function Page() {
  const shows = await api.show.getAll();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title="Shows" />
      <GenreFilter />
      <ShowsOverview shows={shows} />
    </div>
  );
}
