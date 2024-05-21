"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateBand() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const createBand = api.band.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setBio("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createBand.mutate({ name, bio });
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
