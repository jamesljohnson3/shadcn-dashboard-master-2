import { ReactNode } from "react";
import { auth } from "@clerk/nextjs";
import DashNavbar from "@/components/Navbar";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { userId } = auth();
  console.log("Fetched userId:", userId);

  if (!userId) {
    return (
      <div className="flex-grow  w-full md:overflow-y-auto sm:p-6">
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-grow flex-col min-h-screen min-w-full bg-background">
        <NextTopLoader
          color="#7B00D3"
          initialPosition={0.78}
          crawlSpeed={800}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={400}
          shadow="0 0 10px #7B00D3,0 0 5px #7B00D3"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />

        <DashNavbar params={{
          storeId: userId
        }} />

        <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
