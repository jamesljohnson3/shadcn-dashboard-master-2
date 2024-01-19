"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";


class UserNotFoundErr extends Error {}

export async function createWorkspace(name: string): Promise<string> {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  try {
    const workspace = await prisma.workspace.create({
      data: {
        name,
        creatorId: user.id,
        photoUrl: "default-photo-url",
        slug: name ,
        inviteCode: name ,
        



      },
    });

    console.log("Workspace created:", workspace.id);
    return workspace.id;
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw error;
  }
}
export type SpaceUserRole = 'ADMIN' | 'USER' | 'GUEST';

export async function createSpace(role: SpaceUserRole, slug: string, workspaceId: string, name: string)  {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
 
}


