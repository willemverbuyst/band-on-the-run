import { Poppins } from "next/font/google";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import SiteHeader from "./_components/header/site-header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={cn(poppins.className, "dark")}>
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
