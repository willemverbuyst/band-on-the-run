"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { BandSchema, bandSchema } from "~/validationSchema/band";
import { bands } from "../../../prisma/development/bands";

export function CreateBand() {
  const genresFromData = bands.reduce((acc, band) => {
    return [...acc, ...band.genre];
  }, [] as string[]);
  const uniqueGenres = Array.from(new Set(genresFromData));
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<BandSchema>({
    resolver: zodResolver(bandSchema),
  });

  const createBand = api.band.create.useMutation({
    onSuccess: () => {
      router.refresh();
      reset();
    },
  });

  const onSubmit: SubmitHandler<BandSchema> = (data) => {
    createBand.mutate({
      name: data.name,
      bio: data.bio,
      foundedYear: data.foundedYear,
      country: data.origin,
      genre: data.genre,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="name">name</label>
        <input
          {...register("name")}
          id="name"
          placeholder="name of the band"
          className="w-full rounded px-4 py-2 text-black"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="yearFounded">year founded</label>
        <input
          {...register("foundedYear")}
          id="yearFounded"
          placeholder="year the band was founded"
          className="w-full rounded px-4 py-2 text-black"
        />
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="origin">origin</label>
        <input
          {...register("origin")}
          id="origin"
          placeholder="country where the band is from"
          className="w-full rounded px-4 py-2 text-black"
        />
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="genre">genre</label>
        <select
          {...register("genre")}
          id="genre"
          className="w-full rounded px-4 py-2 text-black"
        >
          {uniqueGenres.map((ug) => (
            <option key={ug} value={ug}>
              {ug}
            </option>
          ))}
        </select>
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="bio">bio</label>
        <textarea
          {...register("bio")}
          id="bio"
          placeholder="biography of the band"
          className="w-full rounded px-4 py-2 text-black"
        />
      </section>
      <section className="flex flex-col gap-1">
        <button
          type="submit"
          className="rounded bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createBand.isPending}
        >
          {createBand.isPending ? "Submitting..." : "Submit"}
        </button>
      </section>
    </form>
  );
}
