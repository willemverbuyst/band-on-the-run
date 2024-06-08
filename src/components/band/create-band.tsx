"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Genre } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { getYearsForSelect } from "~/lib/date";
import { genres } from "~/lib/genre";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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

export const formSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  bio: z.string().optional(),
  foundedYear: z.string().regex(/19[0-9]{2}|20[0-2][0-9]/),
  origin: z.string().min(1, { message: "origin of band is required" }),
  // genre: z
  //   .array(z.enum([...genres]))
  //   .min(1, { message: "pick at least one genre" }),
  genre: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export function CreateBand() {
  const router = useRouter();

  const years = useMemo(() => getYearsForSelect(), []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
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

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createBand.mutate({
      name: data.name,
      bio: data.bio,
      foundedYear: Number(data.foundedYear),
      country: data.origin,
      genre: [data.genre as Genre],
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Band</CardTitle>
        <CardDescription>Create a new band</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
      </CardContent>
      <CardFooter className="justify-between">
        <small className="text-gray-500">Band name must be unique</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/bands">Bands</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
