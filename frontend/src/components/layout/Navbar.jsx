import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from "react-icons/fa";

import { logoutUser } from "../../redux/thunks/authThunk";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600">
          ShopVerse
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <NavLink to="/" className="flex items-center gap-2">
            <FaHome />
            Home
          </NavLink>

          <NavLink to="/products" className="flex items-center gap-2">
            <FaBoxOpen />
            Products
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/wishlist" className="flex items-center gap-2">
                <FaHeart />
                Wishlist
              </NavLink>

              <NavLink to="/cart" className="flex items-center gap-2">
                <FaShoppingCart />
                Cart
              </NavLink>

              <NavLink to="/orders" className="flex items-center gap-2">
                <FaClipboardList />
                Orders
              </NavLink>

              <NavLink to="/notifications" className="flex items-center gap-2">
                <FaBell />
                Notifications
              </NavLink>

              <NavLink to="/profile" className="flex items-center gap-2">
                <FaUser />
                {user?.name}
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="flex items-center gap-2">
                <FaSignInAlt />
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="flex items-center gap-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
              >
                <FaUserPlus />
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
