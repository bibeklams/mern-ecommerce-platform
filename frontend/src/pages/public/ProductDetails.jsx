import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { getSingleProduct } from "../../redux/thunks/productThunk";
import { addToCart } from "../../redux/thunks/cartThunk";
import ProductReviews from "../../components/review/ProductReviews";

// Reusable scroll-in wrapper — animates once when the element enters the
// viewport, doesn't replay on every scroll up/down.
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { loading: cartLoading } = useSelector((state) => state.cart);

  const [selectedImage, setSelectedImage] = useState("");

  // Fetch product
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  // Set first image
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].secure_url);
    }
  }, [product]);

  const checkAuth = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleAddToCart = async () => {
    if (!checkAuth()) return;

    try {
      await dispatch(addToCart(product._id)).unwrap();
      toast.success("Product added to cart!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    if (!checkAuth()) return;

    try {
      await dispatch(addToCart(product._id)).unwrap();

      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const inStock = product.stock > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        {/* ================= IMAGE SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Main Image */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 h-[420px] flex items-center justify-center overflow-hidden">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={selectedImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
            {product.images?.map((image) => (
              <motion.button
                key={image._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(image.secure_url)}
                className={`
                  shrink-0
                  w-16 h-16
                  rounded-lg
                  overflow-hidden
                  bg-gray-50
                  border
                  flex items-center justify-center
                  transition-colors
                  ${
                    selectedImage === image.secure_url
                      ? "border-gray-900"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <img
                  src={image.secure_url}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ================= PRODUCT DETAILS ================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {product.brand}
            </p>
          )}

          <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              Rs. {product.finalPrice}
            </span>

            {product.discountAmount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                Rs. {product.price}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="mt-6 space-y-2 text-sm border-t border-gray-100 pt-5">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-900">
                {product.category?.name || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500">Availability</span>
              <span
                className={`font-medium ${
                  inStock ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {inStock ? `In stock (${product.stock})` : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-8">
            <motion.button
              whileHover={{ scale: cartLoading ? 1 : 1.02 }}
              whileTap={{ scale: cartLoading ? 1 : 0.98 }}
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="
              flex-1
              flex items-center justify-center gap-2
              border border-gray-300
              text-gray-800
              py-3 rounded-lg
              text-sm font-semibold
              hover:bg-gray-50 hover:border-gray-400
              disabled:opacity-50
              transition-colors
              "
            >
              <FaShoppingCart size={13} />
              {cartLoading ? "Adding..." : "Add To Cart"}
            </motion.button>

            <motion.button
              whileHover={{ scale: cartLoading ? 1 : 1.02 }}
              whileTap={{ scale: cartLoading ? 1 : 0.98 }}
              onClick={handleBuyNow}
              disabled={cartLoading}
              className="
              flex-1
              flex items-center justify-center gap-2
              bg-gray-900
              text-white
              py-3 rounded-lg
              text-sm font-semibold
              hover:bg-gray-800
              disabled:opacity-50
              transition-colors
              "
            >
              <FaBolt size={13} />
              {cartLoading ? "Processing..." : "Buy Now"}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ================= REVIEWS ================= */}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeInUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-16 border-t pt-12"
      >
        <ProductReviews productId={product._id} />
      </motion.div>
    </div>
  );
}

export default ProductDetails;
