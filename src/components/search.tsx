"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);

      if (!e.target.value) {
        params.delete("search");
        router.replace(`${pathname}?${params.toString()}`);
        return;
      }

      params.set("search", e.target.value);
      router.replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <Input
      type="text"
      placeholder="Search..."
      className="w-[400px]"
      defaultValue={searchParams.get("search")?.toString() ?? ""}
      onChange={(e) => handleSearch(e)}
    />
  );
}
