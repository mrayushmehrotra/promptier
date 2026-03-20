import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { initTRPC, TRPCError } from "@trpc/server";
import { AppRouter } from "./appRouter";
import superjson from "superjson";

export interface Context {
  userId: string | null;
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      userId: ctx.userId,
    },
  });
});

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  // @ts-expect-error - tRPC v11 has complex type requirements for transformer
  config() {
    return {
      transformer: superjson,
      links: [
        // @ts-expect-error - transformer is required but types conflict
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
