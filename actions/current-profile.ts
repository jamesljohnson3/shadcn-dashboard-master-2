"use server";

import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";



class UserNotFoundErr extends Error {}

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


export async function currentProfile(prismaUser: any) {
  // Make Xata API call to record activated token
  const response = await fetch(
    'https://unlimit-potential-lho3ne.us-east-1.xata.sh/db/now2:main/tables/VerificationToken/data?columns=id',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xau_AQ7SbTkHra2xDHXi0VXltyTsdneNyDhR',
      },
      body: JSON.stringify({
        api_key: 'test-upeta-2',
        domain_id: prismaUser.id,
      }),
    }
  );
  const data = await response.json();
  console.log('Xata API response:', data);
}


export async function freeTrial(session) {
  try {
    const user = session?.user;
    if (!user) {
      throw new UserNotFoundErr();
    }

    const apiUrl = "https://myapi.com";  // Replace with your actual API endpoint

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed, e.g., authorization header
        // Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        userId: user.id,
        // Add more properties as needed
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching store data:", error.message);
    throw error; // rethrow the error to handle it outside of this function
  }
}