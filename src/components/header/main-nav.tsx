"use client";

import {} from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { showTypes } from "~/lib/showType";
import { cn } from "~/lib/utils";
import { Icons } from "../icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.music className="h-5 w-5 text-primary" />
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

        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/admin")
                    ? "text-foreground"
                    : "text-foreground/60",
                )}
              >
                Admin
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Bands</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Icons.plus className="mr-2 h-4 w-4" />
                        <Link href="/admin/bands/add">
                          <span>Add new band</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.edit className="mr-2 h-4 w-4" />
                        <Link href="/admin/bands/edit">
                          <span>Edit band</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Shows</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Icons.plus className="mr-2 h-4 w-4" />
                        <Link href="/admin/shows/add">
                          <span>Add new show</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icons.edit className="mr-2 h-4 w-4" />
                        <Link href="/admin/shows/edit">
                          <span>Edit show</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {session && (
          <Link
            href="/dashboard"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/dashboard")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Dashboard
          </Link>
        )}
      </nav>
    </div>
  );
}
