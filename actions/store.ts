"use server";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";



class UserNotFoundErr extends Error {}

// Assuming your Store type looks like this
interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}



export async function GetStoreId(id: string): Promise<Store | null> {
  const response = await fetch(`https://vault.unlimitpotential.com/api/store?id=${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch store data: ${response.statusText}`);
  }

  const data: Store[] = await response.json();

  // Assuming there is only one store per user, get the first item
  const [store] = data;

  return store || null; // Return null if the store is not found
}


// Assuming you have the necessary imports and types/interfaces already defined



export async function findManyStores(): Promise<Store[]> {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const response = await fetch(`https://vault.unlimitpotential.com/api/stores?id=${user.id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response.statusText}`);
    }

    const data: Store[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error in findManyStores:", error);
    throw error;
  }
}

export async function GetStores(id: string) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new UserNotFoundErr();
    }

    const response = await fetch(`https://vault.unlimitpotential.com/api/store?id=${user.id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch store data: ${response.statusText}`);
    }

    const data = await response.json();

    // Destructure the data array and get the first item (assuming there is only one store per user)
    const [store] = data;

    // if the user has a store, then redirect the user to the (dashboard) [storeId]
    // passing the store id into (dashboard)[storeId] params
    if (store) {
      redirect(`/${store.id}`);
    }
  
  } catch (error) {
    // Handle errors, log them, or rethrow if necessary
    console.error("Error in GetStore:", error);
    throw error;
  }
}