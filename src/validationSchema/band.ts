import { z } from "zod";

export const bandSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  bio: z.string().optional(),
  foundedYear: z.number(),
  origin: z.string().min(1, { message: "origin of band is required" }),
  genre: z.array(z.string()),
});

export type BandSchema = z.infer<typeof bandSchema>;
