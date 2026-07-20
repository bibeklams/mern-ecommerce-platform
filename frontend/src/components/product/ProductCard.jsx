import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden bg-gray-100 h-52 flex items-center justify-center">
          <img
            src={product.images[0]?.secure_url}
            alt={product.name}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {product.discountAmount > 0 && (
            <span className="absolute top-2.5 left-2.5 rounded-full bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white">
              Sale
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="font-semibold text-gray-900 text-sm truncate hover:text-indigo-600 transition-colors">
            {product.name}
          </h2>
        </Link>

        <p className="text-gray-400 text-xs mt-0.5">{product.brand}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.finalPrice}
          </span>

          {product.discountAmount > 0 && (
            <span className="text-xs text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            className="
            flex-1
            flex items-center justify-center gap-2
            bg-gray-900 hover:bg-gray-800
            text-white text-sm font-medium
            py-2 rounded-lg
            transition-colors
            "
          >
            <FaShoppingCart size={13} />
            Add to Cart
          </button>

          <button
            className="
            flex items-center justify-center
            h-9 w-9
            rounded-lg
            border border-gray-200
            text-gray-500
            hover:text-red-500 hover:border-red-200 hover:bg-red-50
            transition-colors
            "
            aria-label="Add to wishlist"
          >
            <FaHeart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
