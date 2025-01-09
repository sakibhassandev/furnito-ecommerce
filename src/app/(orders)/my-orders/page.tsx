import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import MyOrders from "@/ui/my-orders/MyOrders";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "My Orders",
};

const MyOrdersPage = () => {
  return (
    <>
      <SectionCommonHeader curr="Orders" prev="Home" name="My Orders" />
      <SessionProvider>
        <MyOrders />
      </SessionProvider>
    </>
  );
};

export default MyOrdersPage;
