import ProductActionMenu from "./ProductActionMenu";
import ProductStatusBadge from "./ProductStatusBadge";
import FeaturedBadge from "./FeaturedBadge";

function ProductRow({ product, onToggleFeatured, onStatusChange, onDelete }) {
  const createdDate = new Date(product.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Product */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={product.images?.[0]?.secure_url}
            alt={product.name}
            className="
              w-14
              h-14
              rounded-lg
              object-cover
              border
              border-gray-200
              flex-shrink-0
            "
          />

          <div>
            <p className="font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </p>

            <p className="text-xs text-gray-500">
              {product.brand || "No Brand"}
            </p>
          </div>
        </div>
      </td>

      {/* Seller */}
      <td className="px-6 py-4">
        <div>
          <p className="font-medium text-gray-800">{product.seller?.name}</p>

          <p className="text-xs text-gray-500">{product.seller?.email}</p>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span
          className="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-indigo-50
            text-indigo-700
            text-xs
            font-medium
          "
        >
          {product.category?.name}
        </span>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">
            Rs. {product.finalPrice.toLocaleString()}
          </p>

          {product.discountAmount > 0 && (
            <p className="text-xs text-gray-500 line-through">
              Rs. {product.price.toLocaleString()}
            </p>
          )}
        </div>
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        <span
          className={`font-semibold ${
            product.stock <= 5 ? "text-red-600" : "text-green-600"
          }`}
        >
          {product.stock}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <ProductStatusBadge status={product.status} />
      </td>

      {/* Featured */}
      <td className="px-6 py-4">
        <FeaturedBadge featured={product.isFeatured} />
      </td>

      {/* Created */}
      <td className="px-6 py-4 text-gray-500">{createdDate}</td>

      {/* Action */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <ProductActionMenu
            product={product}
            onToggleFeatured={onToggleFeatured}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
