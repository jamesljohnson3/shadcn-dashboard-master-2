import * as React from "react"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode
}


export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  } else {
    return    <> {children}</>
}
}