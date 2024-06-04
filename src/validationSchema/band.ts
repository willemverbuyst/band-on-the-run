import { z } from "zod";
import { genres } from "~/utils/genre";

export const bandSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  bio: z.string().optional(),
  foundedYear: z.string().regex(/19[0-9]{2}|20[0-2][0-9]/),
  origin: z.string().min(1, { message: "origin of band is required" }),
  genre: z
    .array(z.enum([...genres]))
    .min(1, { message: "pick at least one genre" }),
});

export type BandSchema = z.infer<typeof bandSchema>;
