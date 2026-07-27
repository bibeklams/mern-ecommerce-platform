import { useEffect, useRef, useState } from "react";

import { FaEllipsisVertical, FaEdit, FaTrash } from "react-icons/fa6";

function CategoryActionMenu({ category, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const handleDelete = () => {
    const confirmDelete = window.confirm(`Delete ${category.name} category?`);

    if (confirmDelete) {
      onDelete(category._id);
    }

    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
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

      {open && (
        <div
          className="
              absolute
              right-0
              mt-2
              w-44
              bg-white
              border
              rounded-xl
              shadow-xl
              overflow-hidden
              z-50
            "
        >
          {/* Edit */}

          <button
            onClick={() => {
              onEdit(category);

              setOpen(false);
            }}
            className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                hover:bg-blue-50
                transition
              "
          >
            <FaEdit className="text-blue-600" />

            <span>Edit Category</span>
          </button>

          {/* Delete */}

          <button
            onClick={handleDelete}
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
                transition
              "
          >
            <FaTrash />

            <span>Delete Category</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryActionMenu;
