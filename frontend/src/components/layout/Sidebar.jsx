import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  FaTachometerAlt,
  FaPlus,
  FaBoxOpen,
  FaShoppingBag,
  FaStar,
  FaUsers,
  FaTags,
  FaUserCheck,
  FaArrowLeft,
} from "react-icons/fa";

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  const isAdmin = user?.role === "ADMIN";
  const menuItems = isAdmin ? adminMenu : sellerMenu;

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5 flex flex-col">
      {/* Back to home */}
      <button
        onClick={() => navigate("/home")}
        className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-50 transition-colors">
          <FaArrowLeft size={11} />
        </span>
        Back to home
      </button>

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6 pb-6 border-b border-gray-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm font-bold">
          S
        </span>
        <h2 className="text-base font-bold tracking-tight text-gray-900">
          {isAdmin ? "Admin Panel" : "Seller Panel"}
        </h2>
      </div>

      <nav className="space-y-1 flex-1">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `
                relative flex items-center gap-3
                px-3.5 py-2.5 rounded-lg
                text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gray-900"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="text-[15px]">{item.icon}</span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
