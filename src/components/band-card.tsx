import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import type { api } from "~/trpc/server";

export default function Card({
  band,
}: {
  band: Awaited<ReturnType<typeof api.band.getAll>>[number];
}) {
  return (
    <section className="flex min-w-[400px] max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
      <h3>
        <Link href={`/bands/${band.id}`}>{band.name}</Link>
      </h3>
      <p className="line-clamp-2">{band.bio}</p>
      <section className="flex flex-wrap gap-2">
        {band.genre.map((g) => (
          <Link key={g} href={`/bands?genre=${g.replaceAll(" ", "+")}`}>
            <Badge variant="secondary">
              {g.replace("_", " ").toLocaleLowerCase()}
            </Badge>
          </Link>
        ))}
      </section>
    </section>
  );
}
