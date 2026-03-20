import { protectedProcedure, router } from "./trpc";
import { addImageInputSchema } from "../lib/types";
import { imageRepository } from "./repositories/imageRepository";

export const appRouter = router({
  getImages: protectedProcedure.query(async ({ ctx }) => {
    return imageRepository.findByUserId(ctx.userId);
  }),
  addImage: protectedProcedure
    .input(addImageInputSchema)
    .mutation(async ({ input, ctx }) => {
      return imageRepository.create({ ...input, userId: ctx.userId });
    }),
  deleteImage: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return imageRepository.delete(input.id, ctx.userId);
    }),
});

export type AppRouter = typeof appRouter;