"use client";

import { type ShowType } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { showTypes } from "~/utils/showType";

export default function ShowTypeCheckbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("type", showTypes.join(","));
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  function handleCheck(type: ShowType) {
    const params = new URLSearchParams(searchParams);
    const currentTypes = params.get("type")?.toString().split(",") ?? [];

    if (!currentTypes.includes(type)) {
      currentTypes.push(type);
    } else {
      const index = currentTypes.indexOf(type);
      currentTypes.splice(index, 1);
    }

    if (currentTypes.length) {
      params.set("type", currentTypes.join(","));
    } else {
      params.delete("type");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex gap-4">
      {showTypes.map((st) => (
        <section key={st} className="flex gap-1">
          <input
            id={st}
            type="checkbox"
            checked={
              !!searchParams.get("type") &&
              searchParams.get("type")?.toString().split(",").includes(st)
            }
            onChange={() => handleCheck(st)}
          />
          <label htmlFor={st}>{st}</label>
        </section>
      ))}
    </section>
  );
}
