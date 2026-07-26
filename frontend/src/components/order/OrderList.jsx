import OrderCard from "./OrderCard";

function OrderList({ orders, onCancel }) {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} onCancel={onCancel} />
      ))}
    </div>
  );
}

export default OrderList;
