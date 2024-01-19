"use server";

import { currentUser } from "@clerk/nextjs";

class UserNotFoundErr extends Error {}

export interface DynamicUserDataFields {
  id: string;
  createdTime: string;
  fields: {
    Attachments: Attachment[];
    Drivetrain: string;
    Notes: string;
    "Body type": string;
    "Vehicle details 1": string;
    "Exterior Color": string;
    Name: string;
    Engine: string;
    "Vehicle details 2": string;
    Created: string;
  };
}

export interface Attachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}



// types/types.ts

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Images {
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
  thumbnails: {
    small: Thumbnail
    large: Thumbnail
    full: Thumbnail
  }
}

export interface Fields {
  Name: string
  Images: Image[]
  Description: string
  Link: string
  Type: string
  Notes: string
  'In stock': boolean
  'Total units sold': number
  'Gross sales': number
  Created: string
}

export interface Record {
  id: string
  createdTime: string
  fields: Fields
}

export interface JsonData {
  records: Record[]
}

export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string; 
  size: number;
  type: string;
  thumbnails: Thumbnails;  
}

export interface Thumbnails {
  small: SmallThumbnail;
  large: LargeThumbnail;
  full: FullThumbnail;
}

export interface SmallThumbnail {
  url: string;
  width: number; 
  height: number;
}

export interface LargeThumbnail {
  url: string;
  width: number;
  height: number; 
}

export interface FullThumbnail {
  url: string;
  width: number;
  height: number;   
}

export interface ProductFields {
  id: string | undefined; 
  name: string | undefined;
  images: Image[] | undefined;
  description: string | undefined;
  link: string | undefined;
  type: string | undefined;
  notes: string | undefined;
  inStock: boolean | undefined;
  totalUnitsSold: number | undefined;
  grossSales: number | undefined;
  created: string | undefined;
  exteriorColor: string | undefined; 
  price: number | undefined; // Added price property  
  url: string | undefined;
}


export interface Product {
  fields: ProductFields;   
}

export interface ArticleFields {
  id: string;
  thumbnail: string;
  banner: string;   
  author: string;
  subtitle: string;
  description: string;
  post: string;
  price: number;
  date: string;
  sections: Section[];  
}


export interface Record {
  id: string;
  thumbnail: string;
  banner: string;
  author: string;
  subtitle: string;
  description: string;
  post: string;
  price: number;
  date: string;
  sections: Section[];
}

export interface Section {
  title: string;
  content: string;
}
export interface Article {
  fields: ArticleFields;
}


export interface Props {
  product: ProductFields | null | undefined;
}
export interface Attachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}
export interface Attachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface VehicleRecord {
  id: string;
  createdTime: string;
  fields: {
    Attachments: Attachment[];
    Drivetrain: string;
    Notes: string;
    "Body type": string;
    "Vehicle details 1": string;
    "Exterior Color": string;
    Name: string;
    Engine: string;
    "Vehicle details 2": string;
    Created: string;
  };
}

export interface AirtableApiResponse {
  records: VehicleRecord[];
}
export interface Data {
  records: VehicleRecord[];
}
export interface DynamicUserDataResponse {
  records: Product[] | Article[]; // Update with your actual data structure
}


export async function DynamicUserData(baseUrl: string, apiKey: string): Promise<DynamicUserDataResponse | null> {
  try {
    const user = await currentUser();

    if (!user) {
      throw new UserNotFoundErr();
    }

    const response = await fetch(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: DynamicUserDataResponse = await response.json();
    console.log("feed", data);

    return data || null; // Return null if data is not found
  } catch (error) {
    console.error("Error in DynamicUserData:", error);
    return null;
  }
}
