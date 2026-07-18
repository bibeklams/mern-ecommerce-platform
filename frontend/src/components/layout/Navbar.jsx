import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

import {
  FaHome,
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaClipboardList,
  FaBell,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
} from "react-icons/fa";

import { logoutUser } from "../../redux/thunks/authThunk";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isSeller = user?.role === "SELLER";
  const isAdmin = user?.role === "ADMIN";
  const canAccessDashboard = isSeller || isAdmin;
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/seller/dashboard";
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Shared link styling — the little gradient dot + underline glow on active
  // is the signature moment this navbar is built around.
  const navClass = ({ isActive }) =>
    `
    relative flex items-center gap-2
    px-1 py-1
    text-sm font-medium tracking-wide
    transition-colors duration-300
    ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
    `;

  const mobileNavClass = ({ isActive }) =>
    `
    flex items-center gap-3
    px-4 py-3 rounded-xl
    text-base font-medium
    transition-colors duration-200
    ${
      isActive
        ? "bg-gradient-to-r from-indigo-500/20 to-cyan-400/10 text-white"
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }
    `;

  const NavItem = ({ to, icon, label, showLabel = true }) => (
    <NavLink to={to} className={navClass}>
      {({ isActive }) => (
        <>
          <span className="text-[15px]">{icon}</span>
          {showLabel && <span>{label}</span>}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <header
      className="
      sticky top-0 z-50
      bg-[#0B1120]/80
      backdrop-blur-xl
      border-b border-white/[0.06]
      "
    >
      <div
        className="
        max-w-7xl mx-auto
        px-5 sm:px-6 lg:px-8 py-4
        flex items-center justify-between
        "
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-2"
        >
          <NavLink to="/" className="flex items-center gap-2">
            <span
              className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400
              text-white text-sm font-black
              shadow-lg shadow-indigo-500/30
              "
            >
              S
            </span>
            <span
              className="
              text-xl font-bold tracking-tight
              bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent
              "
            >
              ShopVerse
            </span>
          </NavLink>
        </motion.div>

        {/* Welcome (desktop only) */}
        {isAuthenticated && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden xl:block text-sm text-slate-400"
          >
            Welcome back,
            <span className="ml-1 font-semibold text-white">{user?.name}</span>
          </motion.p>
        )}

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <NavItem to="/" icon={<FaHome />} label="Home" />
          <NavItem to="/products" icon={<FaBoxOpen />} label="Products" />

          {isAuthenticated && (
            <>
              <NavItem to="/wishlist" icon={<FaHeart />} label="Wishlist" />
              <NavItem to="/cart" icon={<FaShoppingCart />} label="Cart" />
              <NavItem to="/orders" icon={<FaClipboardList />} label="Orders" />
              <NavItem
                to="/notifications"
                icon={<FaBell />}
                showLabel={false}
              />
              <NavItem to="/profile" icon={<FaUser />} label="Profile" />
            </>
          )}

          {canAccessDashboard && (
            <NavItem
              to={dashboardPath}
              icon={<FaChartLine />}
              label="Dashboard"
            />
          )}
        </nav>

        {/* Auth / actions (desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout}
              className="
              flex items-center gap-2
              px-4 py-2 rounded-lg
              bg-white/5 hover:bg-red-500/10
              text-slate-300 hover:text-red-400
              border border-white/10 hover:border-red-500/30
              transition-colors duration-200
              "
            >
              <FaSignOutAlt />
              Logout
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ y: -2 }}>
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                >
                  <FaSignInAlt />
                  Login
                </NavLink>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <NavLink
                  to="/register"
                  className="
                  flex items-center gap-2
                  px-5 py-2 rounded-lg
                  bg-gradient-to-r from-indigo-500 to-violet-500
                  text-white text-sm font-semibold
                  shadow-lg shadow-indigo-500/25
                  hover:shadow-indigo-500/40
                  transition-shadow duration-200
                  "
                >
                  <FaUserPlus />
                  Register
                </NavLink>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg text-slate-200 hover:bg-white/5"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#0B1120]"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {isAuthenticated && (
                <p className="px-4 pb-2 text-sm text-slate-400">
                  Welcome,{" "}
                  <span className="text-white font-semibold">{user?.name}</span>
                </p>
              )}

              <NavLink
                to="/"
                className={mobileNavClass}
                onClick={() => setMobileOpen(false)}
              >
                <FaHome /> Home
              </NavLink>
              <NavLink
                to="/products"
                className={mobileNavClass}
                onClick={() => setMobileOpen(false)}
              >
                <FaBoxOpen /> Products
              </NavLink>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/wishlist"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaHeart /> Wishlist
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaShoppingCart /> Cart
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaClipboardList /> Orders
                  </NavLink>
                  <NavLink
                    to="/notifications"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaBell /> Notifications
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaUser /> Profile
                  </NavLink>

                  {canAccessDashboard && (
                    <NavLink
                      to={dashboardPath}
                      className={mobileNavClass}
                      onClick={() => setMobileOpen(false)}
                    >
                      <FaChartLine /> Dashboard
                    </NavLink>
                  )}

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="
                    flex items-center gap-3
                    mt-2 px-4 py-3 rounded-xl
                    bg-red-500/10 text-red-400
                    font-medium
                    "
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={mobileNavClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaSignInAlt /> Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="
                    flex items-center gap-3
                    mt-2 px-4 py-3 rounded-xl
                    bg-gradient-to-r from-indigo-500 to-violet-500
                    text-white font-semibold
                    "
                  >
                    <FaUserPlus /> Register
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
