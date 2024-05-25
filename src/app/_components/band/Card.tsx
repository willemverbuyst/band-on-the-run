import Link from "next/link";
import { type api } from "~/trpc/server";
import GenreBadge from "../GenreBadge";

export default function Card({
  band,
}: {
  band: Awaited<ReturnType<typeof api.band.getAll>>[number];
}) {
  return (
    <Link
      className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
      key={band.id}
      href={`/bands/${band.id}`}
    >
      <h3 className="text-2xl font-bold">{band.name}</h3>
      <p className="line-clamp-2">{band.bio}</p>
      <section className="flex gap-2">
        {band.genre.map((g) => (
          <GenreBadge key={g} genre={g} customStyle="bg-zinc-950" />
        ))}
      </section>
    </Link>
  );
}
