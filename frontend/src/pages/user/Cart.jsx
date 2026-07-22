import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMapMarkerAlt } from "react-icons/fa";

import ShippingAddress from "../../components/Cart/ShippingAddress";
import OrderSummary from "../../components/Cart/OrderSummary";
import OrderTotal from "../../components/Cart/OrderTotal";

import {
  getMyCart,
  updateCart,
  deleteCart,
  clearCart,
} from "../../redux/thunks/cartThunk";

import { createOrder } from "../../redux/thunks/orderThunk";

function Cart() {
  const dispatch = useDispatch();
  const { items: cart } = useSelector((state) => state.cart);

  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Shipping Address State
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    dispatch(getMyCart());
  }, [dispatch]);

  useEffect(() => {
    if (cart?.length) {
      setSelectedItems(cart.map((item) => item.product._id));
    }
  }, [cart]);

  // =============================
  // Select One
  // =============================

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // =============================
  // Select All
  // =============================

  const handleSelectAll = () => {
    if (selectedItems.length === (cart?.length || 0)) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.product._id));
    }
  };

  // =============================
  // Quantity
  // =============================

  const increaseQuantity = async (productId) => {
    const item = cart.find((i) => i.product._id === productId);

    if (!item) return;

    await dispatch(
      updateCart({
        productId,
        quantity: item.quantity + 1,
      }),
    ).unwrap();

    dispatch(getMyCart());
  };

  const decreaseQuantity = async (productId) => {
    const item = cart.find((i) => i.product._id === productId);

    if (!item || item.quantity === 1) return;

    await dispatch(
      updateCart({
        productId,
        quantity: item.quantity - 1,
      }),
    ).unwrap();

    dispatch(getMyCart());
  };

  // =============================
  // Remove Item
  // =============================

  const removeItem = async (productId) => {
    await dispatch(deleteCart(productId)).unwrap();

    dispatch(getMyCart());
  };

  // =============================
  // Clear Cart
  // =============================

  const clearAll = async () => {
    await dispatch(clearCart()).unwrap();

    dispatch(getMyCart());
  };

  // =============================
  // Total
  // =============================

  const subtotal = useMemo(() => {
    return (
      cart
        ?.filter((item) => selectedItems.includes(item.product._id))
        .reduce(
          (sum, item) => sum + item.product.finalPrice * item.quantity,
          0,
        ) || 0
    );
  }, [cart, selectedItems]);

  // =============================
  // Shipping Address
  // =============================

  const handleShipping = (data) => {
    setShippingAddress(data);
    setShowShippingForm(false);
  };

  // =============================
  // Place Order
  // =============================

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Please add shipping address.");
      return;
    }

    const orderItems = cart
      .filter((item) => selectedItems.includes(item.product._id))
      .map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

    const body = {
      paymentMethod,
      items: orderItems,
      shippingAddress,
    };

    const result = await dispatch(createOrder(body));

    if (createOrder.fulfilled.match(result)) {
      dispatch(getMyCart());

      setSelectedItems([]);
      setShippingAddress(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}

        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}

          <div className="bg-white rounded-xl border border-gray-200">
            {!shippingAddress && !showShippingForm && (
              <button
                onClick={() => setShowShippingForm(true)}
                className="w-full flex justify-between items-center p-5 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <FaMapMarkerAlt size={14} />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Shipping Address
                    </h2>
                    <p className="text-sm text-gray-500">
                      Click to add delivery address
                    </p>
                  </div>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500">
                  <FaPlus size={12} />
                </span>
              </button>
            )}

            {showShippingForm && (
              <>
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                  <h2 className="text-sm font-semibold text-gray-900">
                    Shipping Address
                  </h2>

                  <button
                    onClick={() => setShowShippingForm(false)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="p-5">
                  <ShippingAddress onSubmit={handleShipping} />
                </div>
              </>
            )}

            {shippingAddress && !showShippingForm && (
              <div className="p-5 flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <FaMapMarkerAlt size={14} />
                  </span>
                  <div className="text-sm">
                    <h2 className="font-semibold text-gray-900 mb-1">
                      {shippingAddress.fullName}
                    </h2>
                    <p className="text-gray-500">{shippingAddress.phone}</p>
                    <p className="text-gray-500">
                      {shippingAddress.address}, {shippingAddress.city}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowShippingForm(true)}
                  className="text-sm font-medium text-gray-900 hover:underline shrink-0"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}

          <OrderSummary
            cartItems={cart || []}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onSelectAll={handleSelectAll}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
            onClearCart={clearAll}
          />
        </div>

        {/* RIGHT */}

        <OrderTotal
          subtotal={subtotal}
          shipping={150}
          discount={0}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
  );
}

export default Cart;
