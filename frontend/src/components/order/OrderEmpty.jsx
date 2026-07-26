import { Link } from "react-router-dom";

function OrderEmpty() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <h2 className="text-xl font-semibold">No Orders Yet</h2>

      <p className="text-gray-500 mt-2">
        Start shopping to place your first order.
      </p>

      <Link
        to="/products"
        className="inline-block mt-6 px-6 py-3 rounded-lg bg-gray-900 text-white"
      >
        Shop Now
      </Link>
    </div>
  );
}

export default OrderEmpty;
