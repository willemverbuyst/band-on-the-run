import { bandRouter } from "~/server/api/routers/band";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { showRouter } from "./routers/show";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  band: bandRouter,
  show: showRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.band.all();
 *       ^? Band[]
 */
export const createCaller = createCallerFactory(appRouter);
