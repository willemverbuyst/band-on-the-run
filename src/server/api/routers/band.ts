import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { genres } from "~/utils/genre";

export const bandRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        bio: z.string().optional(),
        foundedYear: z.number(),
        country: z.string(),
        genre: z.array(z.enum([...genres])),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.band.create({
        data: {
          name: input.name,
          bio: input.bio,
          foundedYear: input.foundedYear,
          country: input.country,
          genre: input.genre,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.band.findMany();
  }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.band.findUnique({
      where: { id: input },
      include: { bandShows: { include: { show: true } } },
    });
  }),
});
