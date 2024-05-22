import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const showRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.show.findMany({
      orderBy: { date: "asc" },
      include: { bandShows: { include: { band: { select: { name: true } } } } },
    });
  }),

  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.show.findUnique({
      where: { id: input },
    });
  }),
});