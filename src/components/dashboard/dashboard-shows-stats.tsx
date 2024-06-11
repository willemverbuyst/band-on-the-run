import Link from "next/link";
import { Icons } from "../icons";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DashboardShowsCardTotal from "./dashboard-shows-card-total";
import DashboardShowChart from "./dashboard-shows-chart";

export default function DashboardShowStats() {
  const showsPerMonth = 24;
  const clubShowsPercentage = 80;

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardShowsCardTotal />
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Shows this month</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            {clubShowsPercentage > 75 ? (
              <Icons.CalendarCheck2 />
            ) : (
              <Icons.CalendarX2 />
            )}
            <div className="text-5xl font-bold">{showsPerMonth}</div>
          </CardContent>
          <CardFooter className="mt-auto">
            {clubShowsPercentage > 75 ? (
              <span className="flex items-center gap-1 text-xs text-green-500">
                <Icons.BadgeCheck /> {clubShowsPercentage}% of shows are in
                clubs
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-500">
                <Icons.AlertTriangle /> only {clubShowsPercentage}% of the shows
                are in clubs
              </span>
            )}
          </CardFooter>
        </Card>
        <Card className="flex flex-col border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Featured show</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/shows/foobar">
              <span className="text-2xl">Foo Bar Deluxe</span>
            </Link>
            <span className="text-1xl">Adam - Netherlands</span>
          </CardContent>
          <CardFooter className="mt-auto">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icons.PartyPopper className="text-primary" /> 18th August 2023
            </span>
          </CardFooter>
        </Card>
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
