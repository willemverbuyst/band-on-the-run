"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ShowTypeCheckbox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("type", ["festival", "regular"].join(","));
    router.replace(`${pathname}?${params.toString()}`);
  }, []);

  function handleCheck(type: "festival" | "regular") {
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
    <section>
      <section className="flex gap-2">
        <input
          id="festival"
          type="checkbox"
          checked={
            !!searchParams.get("type") &&
            searchParams.get("type")?.toString().split(",").includes("festival")
          }
          onChange={() => handleCheck("festival")}
        />
        <label htmlFor="festival">Festival</label>
      </section>
      <section className="flex gap-2">
        <input
          id="regular"
          type="checkbox"
          checked={
            !!searchParams.get("type") &&
            searchParams.get("type")?.toString().split(",").includes("regular")
          }
          onChange={() => handleCheck("regular")}
        />
        <label htmlFor="regular">Regular Show</label>
      </section>
    </section>
  );
}
