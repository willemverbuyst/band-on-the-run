import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bandRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1), bio: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.band.create({
        data: {
          name: input.name,
          bio: input.bio,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.band.findMany();
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.band.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
