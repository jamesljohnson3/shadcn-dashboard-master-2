import * as React from "react"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";

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
    return    <>        
    <div
    className={cn(
      "min-h-screen w-full flex ",
      {
        "debug-screens": process.env.NODE_ENV === "development"
      }
    )}
  >
    {/* sidebar */}
    <SideNavbar />
    {/* main page */}
    <div className="p-4 w-full">{children}</div>
  </div></>
}
}


