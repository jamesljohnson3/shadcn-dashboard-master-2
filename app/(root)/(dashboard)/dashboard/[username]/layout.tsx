import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authOptions } from "@/app/utils/auth";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const session = await authOptions;
  console.log("Fetched session:", session);

  if (!profile) {
    notFound();
  }
  return (
    <>
              {children}
      
    </>
  );
}

export default ProfileLayout;
