import type { Metadata } from "next";
import { Login } from "@/app/ui/auth/Login";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
