import { Search } from "lucide-react";
import Overview from "~/app/_components/band/Overview";
import GenreFilter from "~/app/_components/genre-filter";
import PageTitle from "~/components/page-title";
import { api } from "~/trpc/server";

export const metadata = {
  title: "bandOnTheRun | Bands",
  description: "Overview of all bands.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const bands = await api.band.getAll();

  return (
    <div className="flex flex-col items-center gap-4">
      <PageTitle title="Bands" />
      <GenreFilter />
      <Search />
      <Overview bands={bands} />
    </div>
  );
}
