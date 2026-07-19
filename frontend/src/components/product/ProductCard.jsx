import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      {/* Image */}
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-gray-500 text-sm">{product.brand}</p>

        <div className="mt-2">
          <span className="text-xl font-bold text-blue-600">
            ${product.finalPrice}
          </span>

          {product.discountAmount > 0 && (
            <span className="ml-2 text-sm text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            className="
            flex-1
            bg-blue-600
            text-white
            py-2
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <FaShoppingCart />
            Cart
          </button>

          <button
            className="
            border
            p-2
            rounded-lg
            text-red-500
            "
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
