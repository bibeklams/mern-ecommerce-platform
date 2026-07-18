import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaPlus,
  FaBoxOpen,
  FaShoppingBag,
  FaStar,
  FaUsers,
  FaTags,
  FaUserCheck,
} from "react-icons/fa";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);

  const sellerMenu = [
    {
      name: "Dashboard",
      path: "/seller/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: <FaPlus />,
    },
    {
      name: "My Products",
      path: "/seller/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: <FaShoppingBag />,
    },
    {
      name: "Reviews",
      path: "/seller/reviews",
      icon: <FaStar />,
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Sellers",
      path: "/admin/sellers",
      icon: <FaUserCheck />,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: <FaBoxOpen />,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: <FaTags />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FaShoppingBag />,
    },
  ];

  const menuItems = user?.role === "ADMIN" ? adminMenu : sellerMenu;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg border-r p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">
        {user?.role === "ADMIN" ? "Admin Panel" : "Seller Panel"}
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
