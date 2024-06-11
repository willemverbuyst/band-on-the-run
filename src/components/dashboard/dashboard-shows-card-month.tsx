import { api } from "~/trpc/server";
import { Icons } from "../icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function DashboardShowsCardMonth() {
  const thisMonthsShows = await api.show.getThisMonthsShows();

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Shows this month</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-2">
        {thisMonthsShows > 0 ? <Icons.CalendarCheck2 /> : <Icons.CalendarX2 />}
        <div className="text-5xl font-bold">{thisMonthsShows}</div>
      </CardContent>
      <CardFooter className="mt-auto">
        {thisMonthsShows > 0 ? (
          <span className="flex items-center gap-1 text-xs text-green-500">
            <Icons.BadgeCheck /> Shows this month
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-red-500">
            <Icons.AlertTriangle /> No shows this month
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
