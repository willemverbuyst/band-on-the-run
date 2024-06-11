import { ShowType } from "@prisma/client";
import { format } from "date-fns";
import { api } from "~/trpc/server";
import { Icons } from "../icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DashboardShowChart from "./dashboard-show-chart";

export default async function DashboardShowCardChart() {
  const data = await api.show.getShowsCountByMonthAndType();

  const formattedData: {
    name: string;
    [ShowType.CLUB]: number;
    [ShowType.FESTIVAL]: number;
    [ShowType.RADIO]: number;
    [ShowType.TV]: number;
    [ShowType.TV]: number;
  }[] = [];

  for (const item of data) {
    const monthIndex = item.date.getMonth();
    const formattedMonth = format(item.date, "MMM");
    if (!formattedData[monthIndex]) {
      formattedData[monthIndex] = {
        name: formattedMonth,
        [ShowType.CLUB]: 0,
        [ShowType.FESTIVAL]: 0,
        [ShowType.RADIO]: 0,
        [ShowType.TV]: 0,
      };
    }

    const month = formattedData[monthIndex]!;
    month[item.showType] = month[item.showType] + 1;
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icons.ListMusic />
          <span>Shows per month trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-0">
        <DashboardShowChart data={formattedData} />
      </CardContent>
    </Card>
  );
}
