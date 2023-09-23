import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const workSans = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tapedeck challenge",
  description: "Tapedeck coding challenge - Max",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
