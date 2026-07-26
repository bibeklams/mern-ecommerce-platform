import { useState, useRef, useEffect } from "react";
import {
  FaEllipsisV,
  FaBan,
  FaUnlock,
  FaUserSlash,
  FaUserCheck,
} from "react-icons/fa";

function UserActionMenu({ user, onBan, onUnban, onSuspend, onUnsuspend }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action) => {
    setOpen(false);

    action(user._id);
  };

  return (
    <div ref={menuRef} className="relative">
      {/* Menu Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          h-9
          w-9
          flex
          items-center
          justify-center
          rounded-lg
          hover:bg-gray-100
          text-gray-500
          transition
        "
      >
        <FaEllipsisV size={15} />
      </button>

      {open && (
        <div
          className="
              absolute
              right-0
              mt-2
              w-44
              bg-white
              border
              border-gray-200
              rounded-xl
              shadow-lg
              z-50
              overflow-hidden
            "
        >
          {/* ACTIVE USER */}

          {user.status !== "BANNED" && (
            <button
              onClick={() => handleAction(onBan)}
              className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-red-600
                    hover:bg-red-50
                  "
            >
              <FaBan />
              Ban User
            </button>
          )}

          {/* Banned */}

          {user.status === "BANNED" && (
            <button
              onClick={() => handleAction(onUnban)}
              className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-green-600
                    hover:bg-green-50
                  "
            >
              <FaUnlock />
              Unban User
            </button>
          )}

          {/* Suspend */}

          {user.status !== "SUSPENDED" && user.status !== "BANNED" && (
            <button
              onClick={() => handleAction(onSuspend)}
              className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-yellow-600
                    hover:bg-yellow-50
                  "
            >
              <FaUserSlash />
              Suspend User
            </button>
          )}

          {/* Unsuspend */}

          {user.status === "SUSPENDED" && (
            <button
              onClick={() => handleAction(onUnsuspend)}
              className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-blue-600
                    hover:bg-blue-50
                  "
            >
              <FaUserCheck />
              Unsuspend User
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default UserActionMenu;
