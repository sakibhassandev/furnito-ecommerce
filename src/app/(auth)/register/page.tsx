import type { Metadata } from "next";
import { Register } from "@/ui/auth/Register";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
