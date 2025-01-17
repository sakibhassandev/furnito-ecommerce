import type { Metadata } from "next";
import { poppins } from "@/ui/fonts";
import { ToastContainer } from "react-toastify";
import AdminHeader from "@/ui/admin/AdminHeader";

import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin | Furnito - A Modern Furniture Store",
  description:
    "Furnito is a furniture store. It is a modern and clean furniture store. from people can buy furniture",
  icons: {
    icon: "/assets/furnito-icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased selection:bg-black selection:text-white`}
      >
        <AdminHeader />
        {children}
        <ToastContainer className="text-sm" />
      </body>
    </html>
  );
}
