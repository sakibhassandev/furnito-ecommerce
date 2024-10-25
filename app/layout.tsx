import type { Metadata } from "next";
import { poppins } from "./ui/fonts";
import { Header } from "@/app/ui/common/Header";
import { Footer } from "@/app/ui/common/Footer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Furnito - A Modern Furniture Store",
    default: "Home | Furnito - A Modern Furniture Store",
  },
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
        <ToastContainer className="text-sm" />
      </body>
    </html>
  );
}
