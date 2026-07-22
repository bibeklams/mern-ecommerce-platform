import { FaTrash, FaShoppingBag } from "react-icons/fa";

function OrderSummary({
  cartItems,
  selectedItems,
  onSelectItem,
  onSelectAll,
  onIncrease,
  onDecrease,
  onRemove,
  onClearCart,
}) {
  const allSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Select All */}
      {cartItems.length > 0 && (
        <label className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
          />
          <span className="text-sm font-medium text-gray-700">
            Select all ({cartItems.length})
          </span>
        </label>
      )}

      {/* Products */}
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="rounded-lg border border-gray-200 p-3.5 hover:border-gray-300 transition-colors"
          >
            <div className="flex gap-3.5">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.product._id)}
                onChange={() => onSelectItem(item.product._id)}
                className="mt-1.5 h-4 w-4 shrink-0 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
              />

              <div className="h-18 w-18 shrink-0 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.product.images[0].secure_url}
                  alt={item.product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {item.product.name}
                </h3>

                <p className="text-sm font-bold text-gray-900 mt-1">
                  Rs. {item.product.finalPrice}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      onClick={() => onDecrease(item.product._id)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                    >
                      −
                    </button>

                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => onIncrease(item.product._id)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onRemove(item.product._id)}
                aria-label="Remove item"
                className="self-start text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTrash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length === 0 && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
            <FaShoppingBag size={16} />
          </div>
          <p className="text-sm text-gray-500">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
