import { z } from "zod";
import { showTypes } from "~/lib/showType";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const showRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        date: z.string().min(1),
        showType: z.enum([...showTypes]),
        location: z.object({ city: z.string(), country: z.string() }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.show.create({
        data: {
          name: input.name,
          date: input.date,
          showType: input.showType,
          location: {
            city: input.location.city,
            country: input.location.country,
          },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.show.findMany({
      orderBy: { date: "asc" },
      include: {
        bandShows: {
          include: { band: { select: { name: true, id: true, genre: true } } },
        },
      },
    });
  }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.show.findUnique({
      where: { id: input },
      include: { bandShows: { include: { band: true } } },
    });
  }),
});
