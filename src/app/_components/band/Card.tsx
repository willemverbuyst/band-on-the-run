import Link from "next/link";
import type { api } from "~/trpc/server";
import GenreBadge from "../GenreBadge";

export default function Card({
  band,
}: {
  band: Awaited<ReturnType<typeof api.band.getAll>>[number];
}) {
  return (
    <section className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3 className="text-2xl font-bold">
        <Link href={`/bands/${band.id}`}>{band.name}</Link>
      </h3>
      <p className="line-clamp-2">{band.bio}</p>
      <section className="flex flex-wrap gap-2">
        {band.genre.map((g) => (
          <Link key={g} href={`/bands?genre=${g.replaceAll(" ", "+")}`}>
            <GenreBadge key={g} genre={g} customStyle="bg-zinc-950" />
          </Link>
        ))}
      </section>
    </section>
  );
}
