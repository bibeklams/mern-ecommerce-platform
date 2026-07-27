import ProductRow from "./ProductRow";
import ProductSkeleton from "./ProductSkeleton";

function ProductTable({
  products = [],
  loading,

  onToggleFeatured,
  onStatusChange,
  onDelete,
}) {
  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4 font-semibold">Product</th>

              <th className="px-6 py-4 font-semibold">Seller</th>

              <th className="px-6 py-4 font-semibold">Category</th>

              <th className="px-6 py-4 font-semibold">Price</th>

              <th className="px-6 py-4 font-semibold">Stock</th>

              <th className="px-6 py-4 font-semibold">Status</th>

              <th className="px-6 py-4 font-semibold">Featured</th>

              <th className="px-6 py-4 font-semibold">Created</th>

              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="
                    px-6
                    py-12
                    text-center
                    text-gray-500
                  "
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  onToggleFeatured={onToggleFeatured}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
