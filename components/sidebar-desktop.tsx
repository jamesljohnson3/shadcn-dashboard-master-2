


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";

export async function SidebarDesktop() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null
  }

  return (
<></>
  )
}
