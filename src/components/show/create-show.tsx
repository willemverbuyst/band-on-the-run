"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShowType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { showTypes } from "~/lib/showType";
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
import {
  Form,
  FormControl,
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

export const formSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  date: z.string().min(1, { message: "date is required" }),
  showType: z.enum([...showTypes]),
  location: z.object({
    city: z.string().min(1, { message: "city is required" }),
    country: z.string().min(1, { message: "country is required" }),
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

export function CreateShow() {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      showType: ShowType.CLUB,
      location: {
        city: "",
        country: "",
      },
    },
  });
  const createShow = api.show.create.useMutation({
    onSuccess: () => {
      form.reset();
      router.push("/shows");
    },
  });
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    createShow.mutate({
      name: data.name,
      date: data.date,
      showType: data.showType,
      location: {
        city: data.location.city,
        country: data.location.country,
      },
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Show</CardTitle>
        <CardDescription>Add a new show</CardDescription>
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
                  <FormLabel htmlFor="name">name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of the show"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="date">date</FormLabel>
                  <FormControl>
                    <Input placeholder="date" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="location.city">city</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="city where the festival is"
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
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="location.country">country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="country where the festival is"
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
              name="showType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="showType">year founded</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {showTypes.map((st) => (
                          <SelectItem key={st} value={st}>
                            {st.toLocaleLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={createShow.isPending}>
              {createShow.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-between">
        <small className="text-gray-500">Show must be unique</small>
        <Button asChild variant="outline" size="sm">
          <Link href="/shows">Shows</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
