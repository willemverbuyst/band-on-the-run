"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

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
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-full px-4 py-2 text-black"
        defaultValue={searchParams.get("search")?.toString() ?? ""}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
}
