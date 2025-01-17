import type { Metadata } from "next";
import { ResetPassword } from "@/ui/auth/ResetPassword";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPage = () => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin w-7 h-7" />}>
      <ResetPassword />;
    </Suspense>
  );
};

export default ResetPage;
