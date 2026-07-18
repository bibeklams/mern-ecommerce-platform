import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function SellerLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Seller Sidebar */}
      <Sidebar />

      {/* Seller Page Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerLayout;
