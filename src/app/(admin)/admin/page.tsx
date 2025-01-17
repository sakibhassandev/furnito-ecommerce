import AdminHeader from "@/ui/admin/AdminHeader";
import { SessionProvider } from "next-auth/react";

const AdminPage = () => {
  return (
    <>
      <SessionProvider>
        <AdminHeader />
      </SessionProvider>
    </>
  );
};

export default AdminPage;
