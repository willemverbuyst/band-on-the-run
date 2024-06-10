import Overview from "~/components/band/band-overview";
import GenreFilter from "~/components/genre-filter";
import PageTitle from "~/components/page-title";
import Search from "~/components/search";
import { api } from "~/trpc/server";

export const metadata = {
  title: "bandOnTheRun | Bands",
  description: "Overview of all bands.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function BandsPage() {
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
