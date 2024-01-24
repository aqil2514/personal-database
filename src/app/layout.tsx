import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";
import { Roboto, Playfair_Display, Merriweather, Poppins } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";

import SessionProvider from "@/components/Layouting/SessionProvider";
import NavMenu from "@/components/Layouting/NavMenu";
import Headers from "@/components/Layouting/Headers";

const playfair = Playfair_Display({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Personal Database",
  description: "My Personal Database",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable} ${merriweather.variable} ${poppins.variable}`}>
      <body>
        <SessionProvider session={session}>
          <Headers />
          <main className="flex flex-row">
            <NavMenu />
            {children}
            <Analytics />
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
