

import './globals.css';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Providers } from './providers'
import siteMetadata from "@/app/utils/siteMetaData";
import type { Metadata } from "next";
import DesignerContextProvider from "@/components/context/DesignerContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Play } from "@next/font/google";
import { Roboto } from "@next/font/google";
import { NextAuthProvider } from "./components/NextAuthProvider";
import Header from '@/components/layouts';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: '--roboto'
});

const play = Play({
  weight: "400",
  subsets: ["latin"],
  variable: '--play'
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});
export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (   <ClerkProvider>
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
      className={`${inter.variable} font-sans ${robotoMono.variable} font-monospace ${play.className} ${roboto.className}`}


      >    
      


  
            
              <Providers>
                <div >
                  {/* Include your Header, Navigation, and Footer components here */}
               
                 
                  <NextAuthProvider>
                  <Header />
                  {children}
                  </NextAuthProvider>
        
                </div>
              </Providers>

      
      </body>
    </html>
  </ClerkProvider>
  );
}
