"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBand() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [country, setCountry] = useState("");

  const createBand = api.band.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setBio("");
      setFoundedYear("");
      setCountry("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBand.mutate({
          name,
          bio,
          foundedYear: Number(foundedYear),
          country,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Name of the band"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Year the band was founded"
        value={foundedYear}
        onChange={(e) => setFoundedYear(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Country where the band is from"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <textarea
        placeholder="Bio of the band"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createBand.isPending}
      >
        {createBand.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
