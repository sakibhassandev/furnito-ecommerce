import type { Metadata } from "next";
import { poppins } from "./ui/fonts";
import "./globals.css";
import { Header } from "@/app/ui/common/Header";
import { Footer } from "@/app/ui/common/Footer";

export const metadata: Metadata = {
  title: "Furnito | Home",
  description:
    "Furnito is a furniture store. It is a modern and clean furniture store. from people can buy furniture",
  icons: {
    icon: "/assets/furnito-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
