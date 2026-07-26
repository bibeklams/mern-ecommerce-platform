import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

import OrderTable from "../../components/seller/OrderTable";
import OrderDetailsModal from "../../components/seller/OrderDetailsModal";
import PageNumber from "../../components/common/PageNumber";

import {
  getSellerOrders,
  sellerUpdateOrderStatus,
} from "../../redux/thunks/orderThunk";

function Orders() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { sellerOrders, loading, pages } = useSelector((state) => state.order);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ==========================
  // Fetch Orders
  // ==========================

  useEffect(() => {
    dispatch(getSellerOrders(page));
  }, [dispatch, page]);

  // ==========================
  // View Order
  // ==========================

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  // ==========================
  // Update Status
  // ==========================

  const handleStatusChange = async (orderId, status) => {
    const result = await dispatch(
      sellerUpdateOrderStatus({
        orderId,
        orderStatus: status,
      }),
    );

    if (sellerUpdateOrderStatus.fulfilled.match(result)) {
      toast.success("Order updated successfully");
      dispatch(getSellerOrders(page));
    } else {
      toast.error(result.payload);
    }
  };

  // ==========================
  // Search + Filter
  // ==========================

  const filteredOrders =
    sellerOrders?.filter((order) => {
      const matchSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.shippingAddress?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        order.shippingAddress?.phone?.includes(search);

      const matchStatus =
        statusFilter === "ALL" || order.orderStatus === statusFilter;

      return matchSearch && matchStatus;
    }) || [];

  return (
    <main className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

        <p className="text-sm text-gray-500 mt-1">Manage customer orders</p>
      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col lg:flex-row gap-3 justify-between">
        <div className="relative w-full lg:w-96">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search order ID, customer, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm"
        >
          <option value="ALL">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Orders */}

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={handleViewOrder}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}

      <PageNumber
        currentPage={page}
        totalPages={pages}
        onPageChange={setPage}
      />

      {/* Order Details */}

      <OrderDetailsModal
        isOpen={openModal}
        order={selectedOrder}
        onClose={() => setOpenModal(false)}
      />
    </main>
  );
}

export default Orders;
