import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBell,
  FaChevronDown,
  FaClipboardList,
  FaUser,
  FaChartLine,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { logoutUser } from "../../redux/thunks/authThunk";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Optional chaining keeps this safe even if these slices don't exist yet.
  const cartCount = useSelector((state) => state.cart?.items?.length) || 0;
  const wishlistCount =
    useSelector((state) => state.wishlist?.items?.length) || 0;

  const isAdmin = user?.role === "ADMIN";
  const isSeller = user?.role === "SELLER";
  const canAccessDashboard = isAdmin || isSeller;
  const dashboardPath = isAdmin ? "/admin/dashboard" : "/seller/dashboard";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/product?search=${encodeURIComponent(search)}`);
  };
  const handleLogout = async () => {
    try {
      setProfileOpen(false);
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
    }`;

  const initials = (user?.name || "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const IconBadge = ({ to, icon, count, label }) => (
    <NavLink
      to={to}
      aria-label={label}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
    >
      {icon}
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold leading-none text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </NavLink>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white text-sm font-bold">
              S
            </span>
            <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">
              ShopVerse
            </span>
          </NavLink>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/5 transition-all"
              />
            </form>
          </div>

          {/* Center links (desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/product" className={navLinkClass}>
              Products
            </NavLink>
            {canAccessDashboard && (
              <NavLink to={dashboardPath} className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            {isAuthenticated ? (
              <>
                <IconBadge
                  to="/wishlist"
                  icon={<FaHeart size={15} />}
                  count={wishlistCount}
                  label="Wishlist"
                />
                <IconBadge
                  to="/cart"
                  icon={<FaShoppingCart size={15} />}
                  count={cartCount}
                  label="Cart"
                />
                <IconBadge
                  to="/notifications"
                  icon={<FaBell size={15} />}
                  count={0}
                  label="Notifications"
                />

                {/* Profile dropdown */}
                <div className="relative ml-1" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((p) => !p)}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">
                      {initials || <FaUser size={12} />}
                    </span>
                    <FaChevronDown
                      size={10}
                      className={`hidden sm:block text-gray-400 transition-transform ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg shadow-black/5"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>

                        <NavLink
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FaUser size={13} className="text-gray-400" />
                          Profile
                        </NavLink>
                        <NavLink
                          to="/orders"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <FaClipboardList
                            size={13}
                            className="text-gray-400"
                          />
                          Orders
                        </NavLink>
                        {canAccessDashboard && (
                          <NavLink
                            to={dashboardPath}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <FaChartLine size={13} className="text-gray-400" />
                            Dashboard
                          </NavLink>
                        )}

                        <div className="my-1 border-t border-gray-100" />

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <FaSignOutAlt size={13} />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                >
                  Sign up
                </NavLink>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 ml-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Search (mobile) */}
              <div className="relative mb-3 md:hidden">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:bg-white focus:border-gray-300"
                />
              </div>

              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                Products
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/wishlist"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaHeart size={14} /> Wishlist
                  </NavLink>
                  <NavLink
                    to="/cart"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaShoppingCart size={14} /> Cart
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaClipboardList size={14} /> Orders
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={mobileLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaUser size={14} /> Profile
                  </NavLink>
                  {canAccessDashboard && (
                    <NavLink
                      to={dashboardPath}
                      className={mobileLinkClass}
                      onClick={() => setMobileOpen(false)}
                    >
                      <FaChartLine size={14} /> Dashboard
                    </NavLink>
                  )}

                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 mt-2 rounded-lg text-sm font-medium text-red-600 bg-red-50"
                  >
                    <FaSignOutAlt size={14} /> Logout
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <div className="flex flex-col gap-2 pt-2">
                  <NavLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-200"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-gray-900"
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
