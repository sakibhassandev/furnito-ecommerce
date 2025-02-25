import type { Metadata } from "next";
import { Login } from "@/ui/auth/Login";
import ErrorHandler from "@/ui/common/ErrorHandler";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <>
      <Login />
      <Suspense fallback={null}>
        <ErrorHandler />
      </Suspense>
    </>
  );
};

export default LoginPage;
