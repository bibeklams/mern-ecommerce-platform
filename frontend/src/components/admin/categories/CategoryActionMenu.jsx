import { useEffect, useRef, useState } from "react";
import { FaEllipsisVertical, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

function CategoryActionMenu({ category, onEdit, onDelete }) {
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

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete "${category.name}" category?`);

    if (confirmDelete) {
      onDelete(category._id);
    }

    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
          p-2 rounded-xl transition-all duration-200 
          ${
            open
              ? "bg-gray-100 ring-2 ring-black/5"
              : "hover:bg-gray-50 active:bg-gray-100"
          }
        `}
        aria-label="Category actions"
        aria-expanded={open}
      >
        <FaEllipsisVertical
          className={`text-gray-500 transition-transform duration-200 ${open ? "scale-110" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div
            className="
              absolute right-0 mt-2 w-56
              bg-white rounded-2xl shadow-xl
              border border-gray-100
              z-50 overflow-hidden
              animate-in fade-in slide-in-from-top-2
              duration-200
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="category-actions"
          >
            <div className="py-1.5">
              {/* Edit */}
              <button
                onClick={() => {
                  onEdit(category);
                  setOpen(false);
                }}
                className="
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm font-medium text-gray-700
                  hover:bg-blue-50 hover:text-blue-700
                  active:bg-blue-100
                  transition-colors duration-150
                  group
                "
                role="menuitem"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-150">
                  <FaPenToSquare className="text-sm" />
                </span>
                <span>Edit Category</span>
                <span className="ml-auto text-xs text-gray-400 group-hover:text-blue-400">
                  ⌘E
                </span>
              </button>

              {/* Divider */}
              <div className="mx-3 my-1 h-px bg-gray-100"></div>

              {/* Delete */}
              <button
                onClick={handleDelete}
                className="
                  w-full flex items-center gap-3 px-4 py-2.5
                  text-sm font-medium text-red-600
                  hover:bg-red-50
                  active:bg-red-100
                  transition-colors duration-150
                  group
                "
                role="menuitem"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors duration-150">
                  <FaTrashCan className="text-sm" />
                </span>
                <span>Delete Category</span>
                <span className="ml-auto text-xs text-red-400/60 group-hover:text-red-400">
                  ⌘⌫
                </span>
              </button>
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 bg-gray-50/50 border-t border-gray-100">
              <span className="text-[10px] text-gray-400 tracking-wider uppercase">
                {category?.name
                  ? `Managing: ${category.name}`
                  : "Category actions"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryActionMenu;
