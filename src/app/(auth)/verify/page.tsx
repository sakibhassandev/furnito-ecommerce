import type { Metadata } from "next";
import { Verify } from "@/ui/auth/Verify";

export const metadata: Metadata = {
  title: "Verify Account",
};

const VerifyPage = () => {
  return <Verify />;
};

export default VerifyPage;
