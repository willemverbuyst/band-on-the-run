import { Search } from "lucide-react";
import ShowTypeCheckbox from "~/app/_components/ShowTypeCheckbox";
import GenreFilter from "~/app/_components/genre-filter";
import Overview from "~/app/_components/show/Overview";
import PageTitle from "~/components/page-title";
import { api } from "~/trpc/server";

export const metadata = {
  title: "bandOnTheRun | Shows",
  description: "Overview of all shows.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
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
