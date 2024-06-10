"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import LightDarkToggle from "../light-dark-toggle";
import MainNav from "./main-nav";

export default function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-[100vw] border-b border-border/40 bg-background/95 px-12 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between gap-2 space-x-2 md:justify-end">
          {session?.user?.name && <p>{session.user.name}</p>}
          <LightDarkToggle />
          <Button asChild variant="outline">
            {session ? (
              <Link href="/api/auth/signout">Sign out</Link>
            ) : (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
