"use client";

import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/ui/admin/AdminDashboard";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const session = await getSession();

      if (session?.user.role !== "admin") {
        await signOut();
        router.replace("/login?error=unauthorized");
      }
    };

    checkAdmin();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
