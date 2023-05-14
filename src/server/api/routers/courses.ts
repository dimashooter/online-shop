/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TRPCError } from "@trpc/server";
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

  deleteCourse: protectedProcedure.input(z.object({courseId:z.string()})).mutation( async({ctx,input:{courseId}}) => {

    const data = ctx.prisma.course.delete({
      where:{
        id:courseId 
      }
    })
    if(data === null){
      return new TRPCError({code:'NOT_FOUND'})
    } 
    return data
  }),
  
  getLikedCourses: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session?.user.id;
    const data =  await ctx.prisma.course.findMany({
      orderBy:[{createdAt:'desc'}],
      where:{
        likes:{
          some:{
            userId:currentUserId
          }
        }
      },
      select:{
        id:true,
        description:true,
        createdAt:true,
        _count:{select:{likes:true}},
        title:true,
        likes: currentUserId === null ? false : {
          where:{
            userId:currentUserId
          }
        },
        user:{
          select:{
            name:true, id:true, image:true
          }
        }
              }
      })
    return {
      courses: data.map((course) => {
        return {
          id:course.id,
          description:course.description,
          createdAt:course.createdAt,
          title:course.title,
          likeCount: course._count.likes,
          user:course.user,
          likedByMe:course.likes?.length > 0
      }
      })
    }
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session?.user.id;
    const data =  await ctx.prisma.course.findMany({
      orderBy:[{createdAt:'desc'}],
      select:{
        id:true,
        description:true,
        createdAt:true,
        _count:{select:{likes:true}},
        createdByMe:true,
        title:true,
        likes: currentUserId === null ? false : {
          where:{
            userId:currentUserId
          }
        },
        user:{
          select:{
            name:true, id:true, image:true
          }
        }
              }
      })
    return {
      courses: data.map((course) => {
        return {
          id:course.id,
          description:course.description,
          createdAt:course.createdAt,
          title:course.title,
          likeCount: course._count.likes,
          user:course.user,
          likedByMe:course.likes?.length > 0,
          myCourse: course.user.id === currentUserId
      }
      })
    }
  }),
  getOne:protectedProcedure.input(z.object({courseId:z.string()})).query(async ({ctx,input}) => {
    const data = await ctx.prisma.course.findFirst({
      where:{
        id: input.courseId
      }
    })
    
    return data
  }),

  editCourse:protectedProcedure.input(z.object({courseId:z.string(),title:z.string(),description:z.string()})).mutation(async ({ctx,input:{courseId,description,title}}) => {
    
    const data = await ctx.prisma.course.updateMany({
      where:{
        id:courseId
      },
      data:{
        description:description,
        title:title,
      }
    })

    if(data === null) return;
    
    return data
  }),

  addToFavorite: protectedProcedure.input(z.object({courseId:z.string()})).mutation(async ({ctx,input}) => {
    const userId =  ctx.session.user.id;

    const course = await ctx.prisma.course.findFirst({
      where:{
        id:input.courseId
      }
    })
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
  }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {      
      const data = {CourseId:id,userId: ctx.session.user.id}

      const likeExist = await ctx.prisma.like.findUnique({
        where:{
          userId_CourseId:data
        }
      })

      if(likeExist === null){
        await ctx.prisma.like.create({data})
        return {addedLike:true}
      }  else {
        await ctx.prisma.like.delete({
          where:{
            userId_CourseId:data
          }
        })
        return {addedLike:false}
      }
  })

})
