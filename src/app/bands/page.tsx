import Link from "next/link";
import { api } from "~/trpc/server";
import GenreBadge from "../_components/GenreBadge";
import PageTitle from "../_components/PageTitle";

export default async function Page() {
  const bands = await api.band.getAll();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <PageTitle title="Bands" />
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-8">
          {bands.map((band) => (
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              key={band.id}
              href={`/bands/${band.id}`}
            >
              <h3 className="text-2xl font-bold">{band.name}</h3>
              <p className="line-clamp-2">{band.bio}</p>
              <section className="flex gap-2">
                {band.genre.map((g) => (
                  <GenreBadge key={g} genre={g} />
                ))}
              </section>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
