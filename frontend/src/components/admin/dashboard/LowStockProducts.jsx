import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

function LowStockProducts({ products = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Low Stock Products
          </h2>

          <p className="text-xs text-gray-500 mt-0.5">
            Products running out of stock
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
          <FaExclamationTriangle size={15} />
        </span>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-3">
            <FaCheckCircle size={16} />
          </div>

          <p className="text-sm text-gray-500">
            All products have enough stock.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
            >
              {/* Left Side */}
              <div className="flex items-center gap-3 min-w-0">
                {/* Product Image */}
                <img
                  src={product.images?.[0]?.secure_url || "/placeholder.png"}
                  alt={product.name}
                  className="
                    h-12
                    w-12
                    rounded-lg
                    object-cover
                    bg-gray-100
                    border
                    border-gray-200
                    shrink-0
                  "
                />

                {/* Product Info */}
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.brand}
                  </p>
                </div>
              </div>

              {/* Stock */}
              <div className="text-right shrink-0 ml-4">
                <span
                  className="
                    inline-flex
                    items-center
                    px-2.5
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-red-50
                    text-red-600
                  "
                >
                  {product.stock} left
                </span>

                <div className="mt-1.5">
                  <Link
                    to="/admin/products"
                    className="
                      text-xs
                      font-medium
                      text-gray-500
                      hover:text-gray-900
                      hover:underline
                      transition-colors
                    "
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LowStockProducts;
