import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
