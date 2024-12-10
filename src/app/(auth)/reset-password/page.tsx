import type { Metadata } from "next";
import { ResetPassword } from "@/ui/auth/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
};

const RegisterPage = () => {
  return <ResetPassword />;
};

export default RegisterPage;
