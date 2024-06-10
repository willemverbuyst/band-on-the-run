import React from "react";
import DashboardMainMenu from "~/components/dashboard-main-menu";
import SiteHeader from "~/components/header/site-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="grid flex-grow grid-cols-[250px_1fr]">
        <DashboardMainMenu />
        <div className="overflow-auto px-4 py-2">{children}</div>
      </main>
    </div>
  );
}
