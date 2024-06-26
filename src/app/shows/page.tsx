import { api } from "~/trpc/server";
import GenreFilter from "../_components/GenreFilter";
import PageTitle from "../_components/PageTitle";
import Search from "../_components/Search";
import ShowTypeCheckbox from "../_components/ShowTypeCheckbox";
import Overview from "../_components/show/Overview";

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
