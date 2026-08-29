import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../common/AdminSidebar";
import AdminTopbar from "../common/AdminTopbar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-coffee-cream/30">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopbar setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
