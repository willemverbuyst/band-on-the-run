"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { showTypes } from "~/utils/showType";
import { Icons } from "../icons";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-6 flex items-center space-x-2  text-cyan-500"
      >
        <Icons.music className="h-5 w-5" />
        <span className="hidden font-bold sm:inline-block">bandOnTheRun</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href={{
            pathname: "/shows",
            query: { showType: showTypes.join(",") },
          }}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/shows")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Shows
        </Link>
        <Link
          href="/bands"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/bands")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Bands
        </Link>
        <Link
          href="/admin"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/admin")
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Admin
        </Link>
      </nav>
    </div>
  );
}
