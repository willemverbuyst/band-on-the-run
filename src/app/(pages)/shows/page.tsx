import GenreFilter from "~/components/genre-filter";
import PageTitle from "~/components/page-title";
import Search from "~/components/search";
import ShowTypeCheckbox from "~/components/show-type-checkbox";
import Overview from "~/components/show/show-overview";
import { api } from "~/trpc/server";

export const metadata = {
  title: "bandOnTheRun | Shows",
  description: "Overview of all shows.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function ShowsPage() {
  const shows = await api.show.getAll();

  return (
    <div className="flex flex-col items-center gap-4">
      <PageTitle title="Shows" />
      <GenreFilter />
      <ShowTypeCheckbox />
      <Search />
      <Overview shows={shows} />
    </div>
  );
}
