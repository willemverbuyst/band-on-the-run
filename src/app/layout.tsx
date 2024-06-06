import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import SiteHeader from "./_components/header/site-header";

export const metadata = {
  title: "bandOnTheRun",
  description: "Discover which bands are on the road.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <TRPCReactProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">
              <div className="overflow-auto p-10">{children}</div>
            </main>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
