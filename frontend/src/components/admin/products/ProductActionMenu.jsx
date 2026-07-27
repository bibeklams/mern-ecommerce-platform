import { useEffect, useRef, useState } from "react";
import {
  FaEllipsisVertical,
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaPauseCircle,
  FaTrash,
} from "react-icons/fa6";

function ProductActionMenu({
  product,
  onToggleFeatured,
  onStatusChange,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Menu Button */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          p-2
          rounded-lg
          hover:bg-gray-100
          transition
        "
      >
        <FaEllipsisVertical className="text-gray-600" />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-60
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-xl
            overflow-hidden
            z-50
          "
        >
          {/* Feature */}

          <button
            onClick={() => {
              onToggleFeatured(product._id);
              setOpen(false);
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              hover:bg-yellow-50
              transition
            "
          >
            {product.isFeatured ? (
              <>
                <FaRegStar className="text-yellow-600" />
                <span className="text-gray-700">Remove Featured</span>
              </>
            ) : (
              <>
                <FaStar className="text-yellow-500" />
                <span className="text-gray-700">Make Featured</span>
              </>
            )}
          </button>

          {/* Status */}

          {product.status === "ACTIVE" ? (
            <button
              onClick={() => {
                onStatusChange(product._id, "INACTIVE");
                setOpen(false);
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                hover:bg-yellow-50
                transition
              "
            >
              <FaPauseCircle className="text-yellow-600" />

              <span className="text-gray-700">Mark Inactive</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onStatusChange(product._id, "ACTIVE");
                setOpen(false);
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                hover:bg-green-50
                transition
              "
            >
              <FaCheckCircle className="text-green-600" />

              <span className="text-gray-700">Mark Active</span>
            </button>
          )}

          {/* Delete */}

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                onDelete(product._id);
              }

              setOpen(false);
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-red-600
              hover:bg-red-50
              transition
            "
          >
            <FaTrash />
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductActionMenu;
