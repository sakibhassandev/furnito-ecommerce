import CheckoutPage from "@/ui/checkout/Checkout";
import { InfoHighlights } from "@/ui/common/InfoHighlights";
import { SectionCommonHeader } from "@/ui/common/SectionCommonHeader";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Checkout",
};

const Checkout = () => {
  return (
    <>
      <SectionCommonHeader prev="Home" curr="Checkout" name="Checkout" />
      <SessionProvider>
        <CheckoutPage />
      </SessionProvider>
      <InfoHighlights />
    </>
  );
};

export default Checkout;
