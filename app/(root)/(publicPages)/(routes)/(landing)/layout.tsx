import * as React from "react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";


interface LandingLayoutProps {
  children: React.ReactNode
}

export default async function LandingLayout({
  children,
}: LandingLayoutProps): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
if (session) {
  return redirect("/home");
} else {
  return     <div className=" justify-center p-6 items-center ">
   
  {children}
</div>
}}