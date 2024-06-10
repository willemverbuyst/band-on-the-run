"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export default function DashboardMenuItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md p-2 text-muted-foreground hover:bg-white hover:text-foreground dark:hover:bg-zinc-700",
        isActive &&
          "bg-primary text-foreground hover:bg-primary hover:text-foreground dark:hover:bg-primary",
      )}
    >
      {children}
    </Link>
  );
}
