import { FaMoneyBillWave } from "react-icons/fa";
import { SiEbox } from "react-icons/si";

function OrderTotal({
  subtotal,
  shipping = 0,
  discount = 0,
  paymentMethod,
  setPaymentMethod,
  onPlaceOrder,
  loading,
}) {
  const total = subtotal + shipping - discount;

  const paymentOptions = [
    {
      value: "COD",
      label: "Cash on Delivery",
      icon: <FaMoneyBillWave size={15} />,
    },
    {
      value: "ESEWA",
      label: "eSewa",
      icon: <SiEbox size={15} />,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Total</h2>

      {/* Price Details */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-900">Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium text-gray-900">Rs. {shipping}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Discount</span>
          <span className="font-medium text-emerald-600">− Rs. {discount}</span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">Rs. {total}</span>
        </div>
      </div>

      {/* Payment */}
      <div className="mt-7">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Payment Method
        </h3>

        <div className="space-y-2">
          {paymentOptions.map((option) => {
            const selected = paymentMethod === option.value;

            return (
              <label
                key={option.value}
                className={`flex items-center justify-between rounded-lg border p-3.5 cursor-pointer transition-colors ${
                  selected
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">{option.icon}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {option.label}
                  </span>
                </div>

                <input
                  type="radio"
                  value={option.value}
                  checked={selected}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900/20"
                />
              </label>
            );
          })}
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        disabled={loading}
        className="w-full mt-7 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-semibold transition-colors"
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default OrderTotal;
