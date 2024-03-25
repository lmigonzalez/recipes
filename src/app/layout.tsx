import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const inter = Inter({ subsets: ["latin"] });
import AuthProvider from "@/context/AuthProvider";
export const metadata: Metadata = {
  title: "Delicious Recipes for Every Occasion | Recipes",
  description:
    "Welcome to Recipes! Discover a wide range of delicious recipes for every occasion, from breakfast to dinner and everything in between. Browse our collection of easy-to-follow recipes and bring culinary delight to your table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${inter.className} flex min-h-screen flex-col items-center relative`}
        >
          <Header /> {children} <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
