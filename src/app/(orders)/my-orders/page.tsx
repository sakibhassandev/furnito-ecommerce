import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import MyOrders from "@/ui/my-orders/MyOrders";
import { SessionProvider } from "next-auth/react";

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
