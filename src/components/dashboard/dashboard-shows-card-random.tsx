import Link from "next/link";
import { formatDate } from "~/lib/date";
import { api } from "~/trpc/server";
import { Icons } from "../icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function DashboardShowsCardRandom() {
  const randomShow = await api.show.getRandom();

  return (
    <Card className="flex flex-col border-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Featured show</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link href="/shows/foobar">
          <span className="text-2xl">{randomShow[0]?.name}</span>
        </Link>
        <span className="text-1xl">
          {randomShow[0]?.location.city} - {randomShow[0]?.location.country}
        </span>
      </CardContent>
      <CardFooter className="mt-auto">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icons.PartyPopper className="text-primary" />{" "}
          {randomShow[0]?.date ? formatDate(randomShow[0]?.date) : "No date"}
        </span>
      </CardFooter>
    </Card>
  );
}
