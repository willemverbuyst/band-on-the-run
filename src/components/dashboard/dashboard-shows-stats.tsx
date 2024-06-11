import { Icons } from "../icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DashboardShowsCardMonth from "./dashboard-shows-card-month";
import DashboardShowsCardRandom from "./dashboard-shows-card-random";
import DashboardShowsCardTotal from "./dashboard-shows-card-total";
import DashboardShowChart from "./dashboard-shows-chart";

export default function DashboardShowStats() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardShowsCardTotal />
        <DashboardShowsCardMonth />
        <DashboardShowsCardRandom />
      </div>
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icons.ListMusic />
            <span>Shows per month trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-0">
          <DashboardShowChart />
        </CardContent>
      </Card>
    </>
  );
}
