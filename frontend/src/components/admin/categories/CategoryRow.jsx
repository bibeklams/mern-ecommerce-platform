import { FaImage } from "react-icons/fa";
import CategoryActionMenu from "./CategoryActionMenu";

function CategoryRow({ category, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Image */}

      <td className="px-6 py-4">
        {category.image?.url ? (
          <img
            src={category.image.url}
            alt={category.name}
            className="
                w-12
                h-12
                rounded-lg
                object-cover
                border
              "
          />
        ) : (
          <div
            className="
                w-12
                h-12
                rounded-lg
                bg-gray-100
                flex
                items-center
                justify-center
              "
          >
            <FaImage size={22} className="text-gray-300" />
          </div>
        )}
      </td>

      {/* Name */}

      <td className="px-6 py-4">
        <p
          className="
          font-semibold
          text-gray-900
        "
        >
          {category.name}
        </p>
      </td>

      {/* Description */}

      <td
        className="
        px-6
        py-4
        text-gray-500
        max-w-xs
      "
      >
        <p className="truncate">
          {category.description
            ? category.description.slice(0, 60)
            : "No description"}

          {category.description?.length > 60 && "..."}
        </p>
      </td>

      {/* Date */}

      <td
        className="
        px-6
        py-4
        text-gray-500
      "
      >
        {new Date(category.createdAt).toLocaleDateString()}
      </td>

      {/* Actions */}

      <td
        className="
        px-6
        py-4
        text-right
      "
      >
        <CategoryActionMenu
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}

export default CategoryRow;
