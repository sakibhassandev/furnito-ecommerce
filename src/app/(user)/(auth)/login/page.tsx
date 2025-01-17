import type { Metadata } from "next";
import { Login } from "@/ui/auth/Login";
import ErrorHandler from "@/ui/common/ErrorHandler";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <>
      <Login />
      <ErrorHandler />
    </>
  );
};

export default LoginPage;
