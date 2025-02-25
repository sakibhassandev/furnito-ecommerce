"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const ErrorHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "unauthorized") {
      toast.error("Unauthorized access. Admin access required.", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  }, [searchParams]);

  return null;
};

export default ErrorHandler;
