import type { Metadata } from "next";
import { Verify } from "@/ui/auth/Verify";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Account",
};

const VerifyPage = () => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin w-7 h-7" />}>
      <Verify />
    </Suspense>
  );
};

export default VerifyPage;
