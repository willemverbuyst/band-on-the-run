import { api } from "~/trpc/server";
import PageTitle from "../../components/page-title";
import Search from "../_components/Search";
import ShowTypeCheckbox from "../_components/ShowTypeCheckbox";
import GenreFilter from "../_components/genre-filter";
import Overview from "../_components/show/Overview";

export const metadata = {
  title: "bandOnTheRun | Shows",
  description: "Overview of all shows.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const shows = await api.show.getAll();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PageTitle title="Shows" />
      <GenreFilter />
      <ShowTypeCheckbox />
      <Search />
      <Overview shows={shows} />
    </div>
  );
}
