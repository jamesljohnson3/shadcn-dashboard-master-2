import { Sidebar } from '@/components/sidebar'


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { ChatHistory } from '@/components/chat-history'

export async function SidebarDesktop() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null
  }

  return (
    <Sidebar className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
      {/* @ts-ignore */}
      <ChatHistory userId={session.user.id} />
    </Sidebar>
  )
}
