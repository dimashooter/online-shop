import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { api } from "~/utils/api";

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
  }),

  addToFavorite: protectedProcedure.input(z.object({courseId:z.string()})).mutation(async ({ctx,input}) => {
    const userId =  ctx.session.user.id;

    const course = await ctx.prisma.course.findFirst({
      where:{
        id:input.courseId
      }
    })
    console.log(course);

    if(!course){
      return new TRPCError({code:"NOT_FOUND"})
    }

    const data = await ctx.prisma.reservation.create({
      data:{
        courseId:input.courseId,
        userId: userId
      }
    })

    return data
    
  }),
  getReservation: protectedProcedure.query( async({ctx}) => {
    const userId =  ctx.session.user.id;

    const data = ctx.prisma.reservation.findMany({
      where:{
        userId
      }
    })
    return data
  })
  
   

})
