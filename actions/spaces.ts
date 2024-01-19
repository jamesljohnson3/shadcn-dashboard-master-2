"use server";

import prisma from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs";


class UserNotFoundErr extends Error {}
export async function fetchSpaces() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
   
}


export type SpaceUserRole = 'ADMIN' | 'USER' | 'GUEST';

export async function createSpace(role: SpaceUserRole, slug: string, workspaceId: string, name: string): Promise<string> {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  try {
    const space = await prisma.space.create({
      data: {
        id: "uuid-teest-2",
        name: name,
        slug: slug,  // Add slug to the data object
        workspaceId: workspaceId  // Add workspaceId to the data object
        
      },
    });

    console.log("Space created:", space.id);
    return space.id;
  } catch (error) {
    console.error("Error creating space:", error);
    throw error;
  }
}

