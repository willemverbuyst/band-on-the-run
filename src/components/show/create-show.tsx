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

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "name is required" }),
    date: z.string().min(1, { message: "date is required" }),
    showType: z.enum([...showTypes]),
    location: z.object({
      city: z.string().min(1, { message: "city is required" }),
      country: z.string().min(1, { message: "country is required" }),
    }),
    mainAct: z.string().min(1, { message: "main act is required" }),
    extraBands: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.showType === ShowType.FESTIVAL ||
        data.showType === ShowType.CLUB) &&
      !data.extraBands
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["extraBands"],
        message: "extra bands are required",
      });
    }
    return data;
  });

export type FormSchema = z.infer<typeof formSchema>;

export function CreateShow() {
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      mainAct: "",
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
    console.log({ data });
    // createShow.mutate({
    //   name: data.name,
    //   date: data.date,
    //   showType: data.showType,
    //   location: {
    //     city: data.location.city,
    //     country: data.location.country,
    //   },
    // });
  };

  const showType = form.watch("showType");

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
                  <FormLabel htmlFor="name">Name</FormLabel>
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
              name="mainAct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="mainAct">Main Act</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name of the main act"
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
                  <FormLabel htmlFor="date">Date</FormLabel>
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
                  <FormLabel htmlFor="location.city">City</FormLabel>
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
                  <FormLabel htmlFor="location.country">Country</FormLabel>
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
                  <FormLabel htmlFor="showType">Show type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="select a show type" />
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

            {(showType === ShowType.FESTIVAL || showType === ShowType.CLUB) && (
              <FormField
                control={form.control}
                name="extraBands"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="extraBands">Other acts</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="other bands playing at this show"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={createShow.isPending}>
              {createShow.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-between">
        <small className="text-gray-500">Show must be unique</small>
        <Button asChild variant="outline" size="sm">
          <Link
            href={{
              pathname: "/shows",
              query: { showType: showTypes.join(",") },
            }}
          >
            Shows
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
