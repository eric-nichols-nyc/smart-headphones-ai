import type { Metadata } from "next";
import { Header } from "@/components/header";


export const metadata: Metadata = {
  title: "Smart Headphones Store",
  description: "Browse our collection of smart headphones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Header />
        {children}
    </main>
  );
}
