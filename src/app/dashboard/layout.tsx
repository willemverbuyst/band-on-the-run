import React from "react";
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
        <div className="overflow-auto bg-muted">Side panel</div>
        <div className="overflow-auto">{children}</div>
      </main>
    </div>
  );
}
