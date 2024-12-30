import CheckoutPage from "@/ui/checkout/Checkout";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

const Checkout = () => {
  return (
    <>
      <SectionCommonHeader prev="Home" curr="Checkout" name="Checkout" />
      <CheckoutPage />
      <InfoHighlights />
    </>
  );
};

export default Checkout;
