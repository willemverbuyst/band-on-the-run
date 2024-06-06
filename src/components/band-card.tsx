import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { api } from "~/trpc/server";

export default function BandCard({
  band,
}: {
  band: Awaited<ReturnType<typeof api.band.getAll>>[number];
}) {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>
          <Link href={`/bands/${band.id}`}>{band.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{band.bio}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {band.genre.map((g) => (
          <Link key={g} href={`/bands?genre=${g.replaceAll(" ", "+")}`}>
            <Badge variant="secondary">
              {g.replace("_", " ").toLocaleLowerCase()}
            </Badge>
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
}
