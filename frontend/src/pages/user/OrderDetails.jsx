import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";

import { getSingleOrder } from "../../redux/thunks/orderThunk";

import OrderStatusBadge from "../../components/order/OrderStatusBadge";
import PaymentStatusBadge from "../../components/order/PaymentStatusBadge";

const TIMELINE_STEPS = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];

function OrderDetails() {
  const dispatch = useDispatch();

  const { orderId } = useParams();

  const { order, loading } = useSelector((state) => state.order);
  console.log(order);

  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [dispatch, orderId]);

  if (loading || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="h-8 w-8 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
        <p className="text-sm text-gray-500">Loading order...</p>
      </div>
    );
  }

  const currentStepIndex = TIMELINE_STEPS.indexOf(order.orderStatus);
  const isCancelled = order.orderStatus === "CANCELLED";

  return (
    <main className="max-w-4xl mx-auto space-y-5 px-4 sm:px-0">
      {/* Header */}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Order #{order._id.slice(-6).toUpperCase()}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <OrderStatusBadge status={order.orderStatus} />
        </div>
      </div>

      {/* Timeline */}

      {!isCancelled && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-sm text-gray-900 mb-6">
            Order Timeline
          </h2>

          <div className="flex items-start">
            {TIMELINE_STEPS.map((step, index) => {
              const isDone = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isLast = index === TIMELINE_STEPS.length - 1;

              return (
                <div
                  key={step}
                  className="flex items-center flex-1 last:flex-none"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isDone
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-gray-900/10" : ""}`}
                    >
                      {isDone ? <FaCheck size={11} /> : index + 1}
                    </div>

                    <p
                      className={`mt-2 text-xs whitespace-nowrap ${
                        isDone ? "font-semibold text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.charAt(0) + step.slice(1).toLowerCase()}
                    </p>
                  </div>

                  {!isLast && (
                    <div
                      className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors ${
                        index < currentStepIndex ? "bg-gray-900" : "bg-gray-100"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Shipping */}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-sm text-gray-900 mb-4">
          Shipping Address
        </h2>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <FaMapMarkerAlt size={13} />
          </span>

          <div className="text-sm">
            <p className="font-semibold text-gray-900">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-gray-500 mt-0.5">
              {order.shippingAddress.phone}
            </p>
            <p className="text-gray-500 mt-0.5">
              {order.shippingAddress.address}, {order.shippingAddress.city}
            </p>
          </div>
        </div>
      </div>

      {/* Ordered Products */}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-sm text-gray-900">
            Ordered Products
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {order.items.map((item) => {
            console.log("Image object:", item.image);
            console.log("Secure URL:", item.image?.secure_url);

            return (
              <div key={item.product} className="flex gap-4 p-4 sm:p-6">
                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image?.secure_url}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Qty: {item.quantity} · Rs. {item.price.toLocaleString()}{" "}
                    each
                  </p>
                </div>

                <div className="text-sm font-bold text-gray-900 shrink-0">
                  Rs. {item.totalPrice.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment */}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-sm text-gray-900 mb-4">Payment</h2>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Method</span>
            <span className="font-medium text-gray-900">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>

          {order.transactionId && (
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-medium text-gray-900">
                {order.transactionId}
              </span>
            </div>
          )}

          {order.paidAt && (
            <div className="flex justify-between">
              <span className="text-gray-500">Paid At</span>
              <span className="font-medium text-gray-900">
                {new Date(order.paidAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            Rs. {order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
