"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShowType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { formatDate } from "~/lib/date";
import { showTypes } from "~/lib/showType";
import { api } from "~/trpc/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
    date: z.date().refine((date) => {
      return date.getTime() >= Date.now();
    }, "date cannot be in the past"),
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
      date: undefined,
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
                  <FormLabel>Name</FormLabel>
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
                  <FormLabel>Main Act</FormLabel>
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
                <FormItem className="flex flex-col pt-2">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="flex justify-between pr-1 font-normal normal-case"
                        >
                          {field.value ? (
                            formatDate(field.value)
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Icons.calendar />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        {...field}
                        defaultMonth={field.value}
                        selected={field.value}
                        onSelect={field.onChange}
                        fixedWeeks
                        weekStartsOn={1}
                        fromDate={new Date()}
                        // max two years in the future
                        toDate={new Date(new Date().getFullYear() + 2, 11, 31)}
                        captionLayout="dropdown-buttons"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date for the new show cannot be in the past
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
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
                  <FormLabel>Country</FormLabel>
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
                  <FormLabel>Show type</FormLabel>
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
                    <FormLabel>Other acts</FormLabel>
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
