import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import { Header } from "@/ui/common/Header";
import { MiniCart } from "@/ui/cart/MiniCart";
import { Footer } from "@/ui/common/Footer";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/store/StoreProvider";
import { BackToTop } from "@/ui/common/BackToTop";

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
      <body
        className={`${poppins.className} antialiased selection:bg-black selection:text-white`}
      >
        <StoreProvider>
          <Header />
          <MiniCart />
        </StoreProvider>
        {children}
        <Footer />
        <BackToTop />
        <ToastContainer className="text-sm" />
      </body>
    </html>
  );
}
