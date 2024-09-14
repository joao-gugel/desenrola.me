import "./globals.css";

import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";

import { Header } from "@/components/header";

import QueryProvider from "./query-provider";

import { Libre_Baskerville } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const font = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desenrola.me | Leitor de threads do Bluesky.",
  description: "Leia threads do Bluesky de forma organizada e sem distrações.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased bg-[#fffefb] dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="max-w-[1000px] flex flex-col mx-auto px-5 mb-10">
              <Header />
              {children}
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
