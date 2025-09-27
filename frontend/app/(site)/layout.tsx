import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../../components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookStore",
  description: "BookStore",
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={`${inter.className} overflow-x-hidden`}>
      <Header />
      {children}
    </main>
  );
}
