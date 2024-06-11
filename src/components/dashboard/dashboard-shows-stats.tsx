import DashboardShowCardChart from "./dashboard-shows-card-chart";
import DashboardShowsCardMonth from "./dashboard-shows-card-month";
import DashboardShowsCardRandom from "./dashboard-shows-card-random";
import DashboardShowsCardTotal from "./dashboard-shows-card-total";

export default function DashboardShowStats() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardShowsCardTotal />
        <DashboardShowsCardMonth />
        <DashboardShowsCardRandom />
      </div>

      <DashboardShowCardChart />
    </>
  );
}
