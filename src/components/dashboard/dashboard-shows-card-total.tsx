import Link from "next/link";
import { showTypes } from "~/lib/showType";
import { api } from "~/trpc/server";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default async function DashboardShowsCardTotal() {
  const totalShows = await api.show.getTotal();

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Total shows</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex gap-2">
          <Icons.Drum />
          <div className="text-5xl font-bold">{totalShows}</div>
        </div>
        <div>
          <Button size="xs" asChild>
            <Link
              href={{
                pathname: "/shows",
                query: { showType: showTypes.join(",") },
              }}
            >
              View all
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
