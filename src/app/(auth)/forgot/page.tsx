import type { Metadata } from "next";
import { Forgot } from "@/ui/auth/Forgot";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPage = () => {
  return <Forgot />;
};

export default ForgotPage;
