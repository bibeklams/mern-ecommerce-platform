import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function OrderFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      orderStatus: "",
      paymentStatus: "",
    });
  };

  const hasFilter =
    filters.search || filters.orderStatus || filters.paymentStatus;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />

          <h2 className="font-semibold text-gray-900">Filter Orders</h2>
        </div>

        {hasFilter && (
          <button
            onClick={resetFilters}
            className="
              flex items-center gap-2
              text-sm
              text-red-600
              hover:text-red-700
            "
          >
            <FaTimes />
            Clear
          </button>
        )}
      </div>

      <div
        className="
        grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-4
      "
      >
        {/* Search */}

        <div className="relative">
          <FaSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search order ID or customer..."
            className="
              w-full
              pl-10
              pr-4
              py-2.5
              rounded-xl
              border
              border-gray-200
              outline-none
              focus:ring-2
              focus:ring-black
            "
          />
        </div>

        {/* Order Status */}

        <select
          name="orderStatus"
          value={filters.orderStatus}
          onChange={handleChange}
          className="
            px-4
            py-2.5
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:ring-2
            focus:ring-black
          "
        >
          <option value="">All Order Status</option>

          <option value="PENDING">Pending</option>

          <option value="PROCESSING">Processing</option>

          <option value="SHIPPED">Shipped</option>

          <option value="DELIVERED">Delivered</option>

          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Payment Status */}

        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleChange}
          className="
            px-4
            py-2.5
            rounded-xl
            border
            border-gray-200
            outline-none
            focus:ring-2
            focus:ring-black
          "
        >
          <option value="">All Payment Status</option>

          <option value="PENDING">Pending</option>

          <option value="PAID">Paid</option>

          <option value="FAILED">Failed</option>

          <option value="REFUNDED">Refunded</option>
        </select>
      </div>
    </div>
  );
}

export default OrderFilter;
