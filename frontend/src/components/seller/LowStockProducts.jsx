import { Pencil, PackageSearch } from "lucide-react";

function LowStockProducts({ products = [], onEdit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Low Stock Products
          </h2>

          <p className="text-sm text-gray-500 mt-0.5">
            Products that need restocking
          </p>
        </div>

        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
          {products.length} items
        </span>
      </div>

      {/* Empty */}

      {products.length === 0 ? (
        <div className="py-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-3">
            <PackageSearch size={18} />
          </div>
          <p className="text-sm text-gray-500">No low stock products.</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-y border-gray-100">
              <tr>
                <th className="text-left px-6 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  Image
                </th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  Product
                </th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  Stock
                </th>
                <th className="text-left px-3 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-6 py-2.5 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                  Action
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
                  <td className="px-6 py-3">
                    <div className="h-12 w-12 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images?.[0]?.secure_url}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-3 py-3">
                    <h3 className="text-gray-900 font-semibold">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {product.brand}
                    </p>
                  </td>

                  {/* Stock */}
                  <td className="px-3 py-3">
                    <span className="text-red-600 font-semibold">
                      {product.stock}
                    </span>
                  </td>

                  {/* Badge */}
                  <td className="px-3 py-3">
                    <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                      Low stock
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => onEdit(product)}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LowStockProducts;
