import { FaTimes, FaMapMarkerAlt } from "react-icons/fa";

function OrderDetailsModal({ isOpen, order, onClose }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-[2px] flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-gray-100 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order Details</h2>

            <p className="text-sm text-gray-500 mt-0.5">
              Order #{order._id.slice(-6).toUpperCase()}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={15} />
          </button>
        </div>

        <div className="p-6 space-y-7">
          {/* Customer */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Customer Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">
                  {order.shippingAddress.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Shipping Address
            </h3>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500">
                <FaMapMarkerAlt size={13} />
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            </div>
          </div>

          {/* Products */}

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Ordered Products
            </h3>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border border-gray-200 rounded-xl p-3.5"
                >
                  <div className="h-20 w-20 shrink-0 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image.secure_url}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </h4>

                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity} · Rs. {item.price.toLocaleString()}{" "}
                      each
                    </p>

                    <p className="text-sm font-semibold text-gray-900 mt-1.5">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2.5">
                Payment
              </h3>

              <div className="space-y-1.5 text-sm">
                <p className="text-gray-600">
                  Method:{" "}
                  <span className="font-medium text-gray-900">
                    {order.paymentMethod}
                  </span>
                </p>
                <p className="text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-gray-900">
                    {order.paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2.5">
                Order
              </h3>

              <div className="space-y-1.5 text-sm">
                <p className="text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-gray-900">
                    {order.orderStatus}
                  </span>
                </p>
                <p className="text-gray-600">
                  Ordered At:{" "}
                  <span className="font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Total */}

          <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-900">
              Grand Total
            </h2>

            <h2 className="text-2xl font-bold text-gray-900">
              Rs. {order.totalAmount.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
