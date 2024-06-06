import { api } from "~/trpc/server";
import PageTitle from "../../components/page-title";
import Search from "../_components/Search";
import Overview from "../_components/band/Overview";
import GenreFilter from "../_components/genre-filter";

export const metadata = {
  title: "bandOnTheRun | Bands",
  description: "Overview of all bands.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const bands = await api.band.getAll();

  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <PageTitle title="Bands" />
      <GenreFilter />
      <Search />
      <Overview bands={bands} />
    </div>
  );
}
