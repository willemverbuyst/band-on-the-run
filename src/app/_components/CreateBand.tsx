"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { bands } from "../../../prisma/development/bands";

export function CreateBand() {
  const genresFromData = bands.reduce((acc, band) => {
    return [...acc, ...band.genre];
  }, [] as string[]);
  const uniqueGenres = Array.from(new Set(genresFromData));
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");

  const createBand = api.band.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setBio("");
      setFoundedYear("");
      setCountry("");
      setGenre("");
    },
  });

  function handleSelect(option: string) {
    if (genre === option) {
      setGenre("");
    } else {
      setGenre(option);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBand.mutate({
          name,
          bio,
          foundedYear: Number(foundedYear),
          country,
          genre: [genre],
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Name of the band"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Year the band was founded"
        value={foundedYear}
        onChange={(e) => setFoundedYear(e.target.value)}
        className="w-full rounded px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Country where the band is from"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full rounded px-4 py-2 text-black"
      />
      <select
        id="genre"
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full rounded px-4 py-2 text-black"
      >
        {uniqueGenres.map((ug) => (
          <option key={ug} value={ug}>
            {ug}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Bio of the band"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="w-full rounded px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createBand.isPending}
      >
        {createBand.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
