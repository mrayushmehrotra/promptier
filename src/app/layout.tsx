import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/components/TRPCProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promptier - AI Image Gallery",
  description: "Store, organize, and regenerate AI-generated images with their prompts",
  keywords: ["AI", "images", "gallery", "prompts", "DALL-E", "Midjourney", "Stable Diffusion"],
  authors: [{ name: "Promptier" }],
  openGraph: {
    title: "Promptier - AI Image Gallery",
    description: "Store, organize, and regenerate AI-generated images with their prompts",
    type: "website",
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


import Footer from "@/components/Footer";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="theme-color" content="#6366f1" />
        </head>
        <body
          className={`${inter.variable} font-sans antialiased bg-black text-white`}
        >
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </body>
        <Footer />
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;
