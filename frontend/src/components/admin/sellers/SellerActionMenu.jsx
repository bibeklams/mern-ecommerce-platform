import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FaBan,
  FaUnlock,
  FaPauseCircle,
  FaPlayCircle,
  FaCheckCircle,
  FaEllipsisV,
} from "react-icons/fa";

function SellerActionMenu({ seller, onBan, onUnban, onSuspend, onUnsuspend }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Seller actions"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        <FaEllipsisV size={13} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg shadow-black/5 py-1.5 z-50"
          >
            {/* Suspend / Unsuspend */}
            {seller.status !== "SUSPENDED" ? (
              <button
                onClick={() => {
                  onSuspend(seller._id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <FaPauseCircle size={13} />
                Suspend seller
              </button>
            ) : (
              <button
                onClick={() => {
                  onUnsuspend(seller._id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                <FaPlayCircle size={13} />
                Unsuspend seller
              </button>
            )}

            <div className="my-1 border-t border-gray-100" />

            {/* Ban / Unban */}
            {seller.status !== "BANNED" ? (
              <button
                onClick={() => {
                  onBan(seller._id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaBan size={13} />
                Ban seller
              </button>
            ) : (
              <button
                onClick={() => {
                  onUnban(seller._id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <FaUnlock size={13} />
                Unban seller
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SellerActionMenu;
