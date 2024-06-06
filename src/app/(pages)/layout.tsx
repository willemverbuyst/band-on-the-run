import SiteHeader from "~/components/header/site-header";
import "~/styles/globals.css";

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
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main>
        <div className="overflow-auto p-12">{children}</div>
      </main>
    </div>
  );
}