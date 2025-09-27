import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "BookStore Admin",
  description: "Admin dashboard for BookStore",
};

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className={`${inter.className} flex min-h-screen w-full`}>
      <div className="flex w-full text-gray-900">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl w-full p-6 md:p-8">{children}</div>
        </main>
      </div>
    </main>
  );
}
