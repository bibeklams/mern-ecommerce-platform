import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllOrders,
  adminUpdateOrderStatus,
  updatePaymentStatus,
} from "../../redux/thunks/orderThunk";

import OrderStats from "../../components/admin/orders/OrderStats";
import OrderFilter from "../../components/admin/orders/OrderFilter";
import OrderTable from "../../components/admin/orders/OrderTable";

function Orders() {
  const dispatch = useDispatch();

  const { adminOrders, loading } = useSelector((state) => state.order);

  const [filters, setFilters] = useState({
    search: "",
    orderStatus: "",
    paymentStatus: "",
  });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = (orderId, orderStatus) => {
    dispatch(
      adminUpdateOrderStatus({
        orderId,
        orderStatus,
      }),
    );
  };

  const handlePaymentUpdate = (orderId, paymentStatus) => {
    const order = adminOrders.find((item) => item._id === orderId);

    if (!order) return;

    // Cannot update payment for cancelled orders
    if (order.orderStatus === "CANCELLED") {
      alert("Payment status cannot be changed for a cancelled order.");
      return;
    }

    dispatch(
      updatePaymentStatus({
        orderId,
        paymentStatus,
      }),
    );
  };

  const filteredOrders = useMemo(() => {
    return adminOrders.filter((order) => {
      // Search

      if (filters.search) {
        const search = filters.search.toLowerCase();

        const orderId = order._id.toLowerCase();

        const customer = order.user?.name?.toLowerCase() || "";

        if (!orderId.includes(search) && !customer.includes(search)) {
          return false;
        }
      }

      // Order Status

      if (filters.orderStatus && order.orderStatus !== filters.orderStatus) {
        return false;
      }

      // Payment Status

      if (
        filters.paymentStatus &&
        order.paymentStatus !== filters.paymentStatus
      ) {
        return false;
      }

      return true;
    });
  }, [adminOrders, filters]);

  return (
    <div
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-8
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
          "
        >
          Orders
        </h1>

        <p
          className="
            text-gray-500
            mt-1
          "
        >
          Manage customer orders, delivery status and payments.
        </p>
      </div>

      {/* Stats */}

      <OrderStats orders={adminOrders} />

      {/* Filters */}

      <div className="mt-8">
        <OrderFilter filters={filters} setFilters={setFilters} />
      </div>

      {/* Table */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        <OrderTable
          orders={filteredOrders}
          loading={loading}
          onStatusUpdate={handleStatusUpdate}
          onPaymentUpdate={handlePaymentUpdate}
        />
      </div>
    </div>
  );
}

export default Orders;
