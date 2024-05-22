import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bandRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        bio: z.string().min(1),
        foundedYear: z.number(),
        country: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.band.create({
        data: {
          name: input.name,
          bio: input.bio,
          foundedYear: input.foundedYear,
          country: input.country,
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
