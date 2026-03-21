import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Promptier",
  description: "Your Creative Prompt Vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.png" />

      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
