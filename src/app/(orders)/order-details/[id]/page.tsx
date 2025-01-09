import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import OrderDetails from "@/ui/my-orders/OrderDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <>
      <SectionCommonHeader
        name="Order Details"
        prev="Home"
        curr="Order Details"
      />
      <OrderDetails orderId={id} />
      <InfoHighlights />
    </>
  );
}
