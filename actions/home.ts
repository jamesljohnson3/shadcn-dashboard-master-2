"use server";

// Assuming your Store type looks like this
interface Home {
    data: {
      feed: {
        id: number;
        name: string;
        artist: string;
        cover: string;
      };
      id: number;
    }[];
  }

  import { NextApiRequest, NextApiResponse } from "next";
  import prisma from "@/lib/prisma";
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "POST") {
      const { email } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
        select: { email: true },
      });
      if (user) {
        return res.status(200).json({ exists: true });
      }
      return res.status(200).json({ exists: false });
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  }
  export async function getHome(): Promise<Home | null> {
    try {
      const response = await fetch('https://main-bvxea6i-wgvcdjzemdvhw.uk-1.platformsh.site/items/hometest');
  
      if (!response.ok) {
        throw new Error(`Failed to fetch home data: ${response.statusText}`);
      }
  
      const data: Home = await response.json();
      console.log('madeForYouAlbums:', data);
      return data || null;

    } catch (error) {
      console.error('Error fetching home data:', error);
      return null;
    }
  }
  