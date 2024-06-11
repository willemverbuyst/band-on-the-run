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
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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
  email: z.string().email().min(1, { message: "email is required" }),
  bio: z.string().optional(),
  foundedYear: z.coerce
    .number()
    .min(1950, { message: "year cannot be earlier than 1950" })
    .max(new Date().getFullYear(), {
      message: "year cannot be in the future",
    }),
  origin: z.string().min(1, { message: "origin of band is required" }),
  // genre: z
  //   .array(z.enum([...genres]))
  //   .min(1, { message: "pick at least one genre" }),
  genre: z.string(),
  acceptTerms: z
    .boolean({
      required_error: "you must accept the terms and conditions",
    })
    .refine((checked) => checked, {
      message: "you must accept the terms and conditions",
    }),
});

export type FormSchema = z.infer<typeof formSchema>;

export function BandAdd() {
  const router = useRouter();
  const years = useMemo(() => getYearsForSelect(), []);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      foundedYear: new Date().getFullYear(),
      origin: "",
      genre: "",
      acceptTerms: undefined,
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
      email: data.email,
      bio: data.bio,
      foundedYear: data.foundedYear,
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of the band"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    This email will be used to contact the band
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Country where the band is from"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foundedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year founded</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description of the band"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>I accept the terms and conditions</FormLabel>
                  </div>
                  <FormDescription>
                    By signing up you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      terms and conditions
                    </Link>
                  </FormDescription>
                  <FormMessage />
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