import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16 pt-20 lg:pt-32 ">
     
      {children}
    </div>
  );
}
