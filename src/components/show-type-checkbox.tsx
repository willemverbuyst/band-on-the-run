"use client";

import type { ShowType } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { showTypes } from "~/lib/showType";
import { Checkbox } from "./ui/checkbox";

export default function ShowTypeCheckbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleCheck(showType: ShowType) {
    const params = new URLSearchParams(searchParams);
    const currentTypes = params.get("showType")?.toString().split(",") ?? [];
    console.log(currentTypes);
    if (!currentTypes.includes(showType)) {
      currentTypes.push(showType);
    } else {
      const index = currentTypes.indexOf(showType);
      currentTypes.splice(index, 1);
    }
    if (currentTypes.length) {
      params.set("showType", currentTypes.join(","));
    } else {
      params.delete("showType");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="flex gap-4">
      {showTypes.map((st) => (
        <div className="flex items-center space-x-2" key={st}>
          <Checkbox
            id={st}
            checked={
              !!searchParams.get("showType") &&
              searchParams.get("showType")?.toString().split(",").includes(st)
            }
            onCheckedChange={() => handleCheck(st)}
          />
          <label htmlFor={st}>{st}</label>
        </div>
      ))}
    </section>
  );
}
