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
  getOne:protectedProcedure.input(z.object({courseId:z.string()})).query(async ({ctx,input}) => {
    const data = await ctx.prisma.course.findFirst({
      where:{
        id: input.courseId
      }
    })
    
    return data
  }),

  editCourse:protectedProcedure.input(z.object({courseId:z.string(),title:z.string(),description:z.string()})).mutation(async ({ctx,input}) => {

    const userId = ctx.session.user.id

    const data = await ctx.prisma.course.updateMany({
      where:{
        id: input.courseId,
        userId,
      },
      data:{
        description:input.description,
        title:input.title,
      }
    })
    
    return data
  })


})
