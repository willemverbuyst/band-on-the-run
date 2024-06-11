import { Poppins } from "next/font/google";
import { cn } from "~/lib/utils";
import NextAuthProvider from "~/providers/auth-provider";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

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
          <NextAuthProvider>
            <div>{children}</div>
          </NextAuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
