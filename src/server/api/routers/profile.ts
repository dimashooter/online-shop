/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
 
  getById : publicProcedure.input(z.object({id:z.string()})).query(async({ctx, input:{id}}) => {

    const currentUserId = ctx.session?.user.id;
    const profile = await ctx.prisma.user.findUnique({
      where:{id},
      select:{
        id:true,
        name:true,
        image:true,
        email:true,
        followers: currentUserId == null ? undefined : { where:{id:currentUserId}},
        _count:{select:{followers:true}},
      }
    })

    if(profile == null) {
      return new TRPCError({code:"NOT_FOUND"})
    }
    const result = {
      name: profile.name,
      email: profile.email,
      image: profile.image,
      count: profile._count,
      courseCount:profile._count.followers,
      isFollowing:profile.followers.length > 0
  }
    
    return result
  })
})
