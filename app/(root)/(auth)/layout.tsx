import { ReactNode } from "react";
import * as React from "react"

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: ReactNode }) {

    return     <div className=" justify-center p-6 items-center ">
     
    {children}
  </div>
}
