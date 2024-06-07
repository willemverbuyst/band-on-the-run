import Link from "next/link";
import { Button } from "~/components/ui/button";
import MainNav from "./main-nav";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-[100vw] border-b border-border/40 bg-background/95 px-12 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button asChild variant="outline">
            <Link href="/api/auth/signin">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
