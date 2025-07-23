import type { Metadata } from "next";
import { Fira_Mono, PT_Mono } from "next/font/google";
import { Metadata } from "next";

import "./globals.css";

const firaMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--font-fira-mono",
  weight: "400", // ou ['400', '500', '700'] se precisar de vários pesos
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  variable: "--font-pt-mono",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaMono.variable} ${ptMono.variable} font-sans`}
    >
      <body>{children}</body>
    </html>
  );
}
