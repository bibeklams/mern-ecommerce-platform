import { useEffect, useRef, useState } from "react";

import {
  FaEllipsisV,
  FaTruck,
  FaCheck,
  FaTimes,
  FaCog,
  FaCreditCard,
} from "react-icons/fa";

function OrderActionMenu({ order, onStatusUpdate, onPaymentUpdate }) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatus = (status) => {
    onStatusUpdate(order._id, status);
    setOpen(false);
  };

  const handlePayment = (status) => {
    onPaymentUpdate(order._id, status);
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block">
      {/* Action Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          p-2
          rounded-lg
          hover:bg-gray-100
          transition
        "
      >
        <FaEllipsisV className="text-gray-500" />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-60
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-xl
            z-50
            overflow-hidden
          "
        >
          {/* Status Header */}
          <div
            className="
              px-4
              py-3
              text-xs
              font-semibold
              text-gray-400
              uppercase
              bg-gray-50
            "
          >
            Order Status
          </div>

          {/* Pending -> Processing */}
          {order.orderStatus === "PENDING" && (
            <MenuButton
              icon={<FaCog />}
              label="Move Processing"
              onClick={() => handleStatus("PROCESSING")}
            />
          )}

          {/* Processing -> Shipped */}
          {order.orderStatus === "PROCESSING" && (
            <MenuButton
              icon={<FaTruck />}
              label="Ship Order"
              onClick={() => handleStatus("SHIPPED")}
            />
          )}

          {/* Shipped -> Delivered */}
          {order.orderStatus === "SHIPPED" && (
            <MenuButton
              icon={<FaCheck />}
              label="Mark Delivered"
              onClick={() => handleStatus("DELIVERED")}
            />
          )}

          {/* Cancel */}
          {!["DELIVERED", "CANCELLED"].includes(order.orderStatus) && (
            <MenuButton
              danger
              icon={<FaTimes />}
              label="Cancel Order"
              onClick={() => handleStatus("CANCELLED")}
            />
          )}

          <div className="border-t border-gray-100 my-2" />

          {/* Payment */}
          <div
            className="
              px-4
              py-3
              text-xs
              font-semibold
              text-gray-400
              uppercase
              bg-gray-50
            "
          >
            Payment
          </div>

          {order.paymentStatus !== "PAID" && (
            <MenuButton
              icon={<FaCreditCard />}
              label="Mark Paid"
              onClick={() => handlePayment("PAID")}
            />
          )}

          {order.paymentStatus === "PAID" && (
            <MenuButton
              icon={<FaCreditCard />}
              label="Refund Payment"
              onClick={() => handlePayment("REFUNDED")}
            />
          )}
        </div>
      )}
    </div>
  );
}

function MenuButton({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        text-sm
        transition

        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-50"
        }
      `}
    >
      <span className="text-base">{icon}</span>

      <span>{label}</span>
    </button>
  );
}

export default OrderActionMenu;
