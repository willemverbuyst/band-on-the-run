import DashboardMenuItem from "./dashboard-menu-item";
import DashboardMenuTitle from "./dashboard-menu-title";

export default function DashboardMainMenu() {
  return (
    <nav className="overflow-auto bg-muted p-4">
      <header className="border-b border-b-zinc-300 pb-4 dark:border-b-black">
        <DashboardMenuTitle />
      </header>
      <ul className="py-4">
        <DashboardMenuItem href="/dashboard/shows">Shows</DashboardMenuItem>
        <DashboardMenuItem href="/dashboard/bands">Bands</DashboardMenuItem>
        <DashboardMenuItem href="/dashboard/account">Account</DashboardMenuItem>
        <DashboardMenuItem href="/dashboard/settings">
          Settings
        </DashboardMenuItem>
      </ul>
    </nav>
  );
}
