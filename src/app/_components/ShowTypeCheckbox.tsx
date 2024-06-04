"use client";

import { ShowType } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShowTypeCheckbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const showTypes = [
    ShowType.CLUB,
    ShowType.FESTIVAL,
    ShowType.RADIO,
    ShowType.TV,
  ] as const;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("type", showTypes.join(","));
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

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
