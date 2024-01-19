import { currentUser } from '@clerk/nextjs';
import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import prisma from "@/lib/prisma";
import { z } from 'zod';

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const user = await currentUser()

        if (!user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' })

        const dbUser = await prisma.user.findFirst({
            where: {
                id: user.id
            }
        })
        if (!dbUser) {
            await prisma.user.create({
                data: {
                    id: user.id
                }
            })
        }
        return { success: true }
    }),

   

});

export type AppRouter = typeof appRouter;