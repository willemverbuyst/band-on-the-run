"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/trpc/react";
import { getYearsForSelect } from "~/utils/date";
import { getUniqueGenres } from "~/utils/genre";
import { BandSchema, bandSchema } from "~/validationSchema/band";

export function CreateBand() {
  const router = useRouter();
  const genres = useMemo(() => getUniqueGenres(), []);
  const years = useMemo(() => getYearsForSelect(), []);

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
      foundedYear: Number(data.foundedYear),
      country: data.origin,
      genre: data.genre,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[400px] flex-col gap-2"
    >
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
        <select
          {...register("foundedYear")}
          id="yearFounded"
          className="w-full rounded px-4 py-2 text-black"
          defaultValue={new Date().getFullYear()}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="origin">origin</label>
        <input
          {...register("origin")}
          id="origin"
          placeholder="country where the band is from"
          className="w-full rounded px-4 py-2 text-black"
        />
        {errors.origin && (
          <p className="text-red-500">{errors.origin.message}</p>
        )}
      </section>
      <section className="flex flex-col gap-1 py-2">
        <label htmlFor="genre">genre</label>
        <select
          {...register("genre")}
          id="genre"
          className="w-full rounded px-4 py-2 text-black"
          multiple
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
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
