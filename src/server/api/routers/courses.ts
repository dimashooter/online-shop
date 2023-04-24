import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const courcesRouter = createTRPCRouter({
  createCourse: protectedProcedure.input(z.object({title:z.string(),description:z.string()})).mutation(async ({ctx,input}) => {
    const userId = ctx.session.user.id || '1'
    const data = await ctx.prisma.course.create({
      data: {
        title:input.title,
        description:input.description,
        userId
      }
    })
    return data;
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany();
  }),
});
