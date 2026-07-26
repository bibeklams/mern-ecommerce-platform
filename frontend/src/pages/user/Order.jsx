import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

import { getMyOrders, cancelOrder } from "../../redux/thunks/orderThunk";

import OrderList from "../../components/order/OrderList";
import OrderSkeleton from "../../components/order/OrderSkeleton";
import OrderEmpty from "../../components/order/OrderEmpty";
import PageNumber from "../../components/common/PageNumber";

const STATUS_FILTERS = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

function Orders() {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    orders = [],
    loading,
    pages = 1,
  } = useSelector((state) => state.order);

  const currentPage = Number(searchParams.get("page")) || 1;

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  // ==========================
  // Fetch Orders
  // ==========================

  useEffect(() => {
    dispatch(getMyOrders(currentPage));
  }, [dispatch, currentPage]);

  // ==========================
  // Change Page
  // ==========================

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage,
    });
  };

  // ==========================
  // Cancel Order
  // ==========================

  const handleCancel = async (order) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmCancel) return;

    const result = await dispatch(cancelOrder(order._id));

    if (cancelOrder.fulfilled.match(result)) {
      toast.success(result.payload.message);

      dispatch(getMyOrders(currentPage));
    } else {
      toast.error(result.payload || "Cancel failed");
    }
  };

  // ==========================
  // Search + Filter
  // ==========================

  const filteredOrders = orders.filter((order) => {
    const text = search.toLowerCase();

    const matchSearch =
      order._id?.toLowerCase().includes(text) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(text);

    const matchStatus = status === "ALL" || order.orderStatus === status;

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <OrderSkeleton />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        <p className="text-sm text-gray-500 mt-1">
          {orders.length
            ? `You've placed ${orders.length} order${
                orders.length !== 1 ? "s" : ""
              } so far.`
            : "View and manage your orders."}
        </p>
      </div>

      {/* Search and Filter */}

      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="relative">
          <FaSearch
            className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search by order id or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            rounded-lg
            border
            py-2.5
            pl-10
            pr-4
            bg-gray-50
            outline-none
            focus:bg-white
            "
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {STATUS_FILTERS.map((filter) => {
            const active = status === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => setStatus(filter.value)}
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-semibold
                  border
                  ${active ? "bg-gray-900 text-white" : "text-gray-600"}
                  `}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders */}

      {filteredOrders.length === 0 ? (
        <OrderEmpty />
      ) : (
        <>
          <OrderList orders={filteredOrders} onCancel={handleCancel} />

          <PageNumber
            currentPage={currentPage}
            totalPages={pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
}

export default Orders;
