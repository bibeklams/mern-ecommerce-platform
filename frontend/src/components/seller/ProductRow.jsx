import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-700",
  OUT_OF_STOCK: "bg-red-50 text-red-600",
};

function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50/60 transition-colors">
      {/* Image */}
      <td className="px-5 py-3.5">
        <div className="h-14 w-14 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.images?.[0]?.secure_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </td>

      {/* Name */}
      <td className="px-5 py-3.5">
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
      </td>

      {/* Category */}
      <td className="px-5 py-3.5 text-gray-600 text-sm">
        {product.category?.name}
      </td>

      {/* Price */}
      <td className="px-5 py-3.5">
        <div className="font-semibold text-gray-900">
          Rs. {product.finalPrice}
        </div>

        {product.discountAmount > 0 && (
          <div className="text-xs line-through text-gray-400">
            Rs. {product.price}
          </div>
        )}
      </td>

      {/* Stock */}
      <td className="px-5 py-3.5">
        <span
          className={`font-semibold text-sm ${
            product.stock <= 5 ? "text-red-600" : "text-gray-900"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* Rating */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1 text-gray-800 text-sm">
          <FaStar className="text-amber-400" size={12} />
          {product.averageRating || 0}
        </div>
        <div className="text-xs text-gray-500">
          ({product.totalReviews || 0})
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            statusStyles[product.status] || "bg-amber-50 text-amber-700"
          }`}
        >
          {product.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(product)}
            aria-label="Edit product"
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <FaEdit size={13} />
          </button>

          <button
            onClick={() => onDelete(product)}
            aria-label="Delete product"
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
