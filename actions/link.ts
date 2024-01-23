import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

class UserNotFoundErr extends Error {}

export async function getLinks() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.link.findMany({
    where: { userId: user.id as string },
  });
}

export async function getLink(id: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.link.findMany({
    where: { id: id },
  });
}
