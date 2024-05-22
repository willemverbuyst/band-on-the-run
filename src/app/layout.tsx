import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import NavBar from "./_components/NavBar";

export const metadata = {
  title: "Band on the Run",
  description: "Discover which bands are on the road.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <main className="flex min-h-screen w-full flex-col bg-black text-white">
            <NavBar />

            <div className="overflow-auto p-10">{children}</div>
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
