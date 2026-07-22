import { FaEdit, FaTrash, FaBoxOpen, FaStar } from "react-icons/fa";

function SellerProductTable({ products = [], onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-14 text-center">
        <p className="text-sm text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-14 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-4">
          <FaBoxOpen size={18} />
        </div>
        <h2 className="text-base font-semibold text-gray-900">
          No products found
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Click "Add Product" to create your first product.
        </p>
      </div>
    );
  }

  const statusStyles = {
    ACTIVE: "bg-emerald-50 text-emerald-700",
    OUT_OF_STOCK: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Image
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Name
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Category
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Price
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Stock
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Rating
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Status
              </th>
              <th className="px-5 py-3 text-center font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50/60 transition-colors"
              >
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
                  <div className="font-semibold text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {product.brand}
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-3.5 text-gray-600">
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
                    className={`font-semibold ${
                      product.stock <= 5 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Rating */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1 text-gray-800">
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
                      statusStyles[product.status] ||
                      "bg-amber-50 text-amber-700"
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerProductTable;
