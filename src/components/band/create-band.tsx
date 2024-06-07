"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Genre } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { getYearsForSelect } from "~/lib/date";
import { genres } from "~/lib/genre";
import { api } from "~/trpc/react";
import { bandSchema, type BandSchema } from "~/validationSchema/band";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export function CreateBand() {
  const router = useRouter();

  const years = useMemo(() => getYearsForSelect(), []);

  const form = useForm<BandSchema>({
    resolver: zodResolver(bandSchema),
    defaultValues: {
      name: "",
      bio: "",
      foundedYear: "",
      origin: "",
      genre: "",
    },
  });

  const createBand = api.band.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/bands");
    },
  });

  const onSubmit: SubmitHandler<BandSchema> = (data) => {
    createBand.mutate({
      name: data.name,
      bio: data.bio,
      foundedYear: Number(data.foundedYear),
      country: data.origin,
      genre: [data.genre as Genre],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="foundedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">year founded</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">origin</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">genre</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g.replace(/_/g, " ").toLocaleLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="bio">bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createBand.isPending}>
          {createBand.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
