import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";
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

  // UI-only local state — not wired to a wishlist thunk yet. Wire this up to
  // your actual addToWishlist/removeFromWishlist actions when ready.
  const [wishlisted, setWishlisted] = useState(false);

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

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      // user cancelled share sheet — ignore
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 animate-pulse">
          <div className="h-[440px] rounded-2xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-8 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
            <div className="h-10 w-40 bg-gray-100 rounded mt-6" />
          </div>
        </div>
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
  const discountPercent =
    product.discountAmount > 0
      ? Math.round((product.discountAmount / product.price) * 100)
      : 0;
  const rating = product.averageRating || 0;
  const reviewCount = product.totalReviews || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-28 md:pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
        <span
          onClick={() => navigate("/")}
          className="hover:text-gray-700 cursor-pointer transition-colors"
        >
          Home
        </span>
        <FaChevronRight size={9} />
        <span
          onClick={() => navigate("/products")}
          className="hover:text-gray-700 cursor-pointer transition-colors"
        >
          Products
        </span>
        <FaChevronRight size={9} />
        <span className="text-gray-600 truncate max-w-[160px]">
          {product.name}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* ================= IMAGE SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Main Image */}
          <div className="relative rounded-2xl border border-gray-200 bg-gray-50 h-[380px] sm:h-[460px] flex items-center justify-center overflow-hidden group">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                −{discountPercent}%
              </span>
            )}

            <button
              onClick={() => setWishlisted((w) => !w)}
              aria-label="Toggle wishlist"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm hover:scale-105 transition-transform"
            >
              <AnimatePresence mode="wait" initial={false}>
                {wishlisted ? (
                  <motion.span
                    key="filled"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                  >
                    <FaHeart className="text-red-500" size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="outline"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                  >
                    <FaRegHeart className="text-gray-500" size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={selectedImage}
              alt={product.name}
              className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2.5 mt-3.5 overflow-x-auto pb-1">
            {product.images?.map((image) => (
              <motion.button
                key={image._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(image.secure_url)}
                className={`
                  shrink-0
                  w-16 h-16 sm:w-20 sm:h-20
                  rounded-xl
                  overflow-hidden
                  bg-gray-50
                  border-2
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

          {/* Trust row */}
          <div className="hidden md:flex items-center gap-6 mt-6 pt-5 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FaTruck className="text-gray-400" size={13} />
              Fast delivery
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-gray-400" size={13} />
              Secure payment
            </div>
            <div className="flex items-center gap-2">
              <FaUndo className="text-gray-400" size={13} />
              Easy returns
            </div>
          </div>
        </motion.div>

        {/* ================= PRODUCT DETAILS ================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              {product.brand && (
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {product.brand}
                </p>
              )}

              <h1 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-snug">
                {product.name}
              </h1>
            </div>

            <button
              onClick={handleShare}
              aria-label="Share"
              className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors"
            >
              <FaShare size={13} />
            </button>
          </div>

          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md text-xs font-semibold">
                <FaStar size={11} />
                {rating.toFixed(1)}
              </div>
              <span className="text-xs text-gray-400">
                {reviewCount} review{reviewCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <p className="text-gray-500 text-sm mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold text-gray-900">
              Rs. {product.finalPrice}
            </span>

            {product.discountAmount > 0 && (
              <>
                <span className="text-base text-gray-400 line-through">
                  Rs. {product.price}
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  Save Rs. {product.discountAmount}
                </span>
              </>
            )}
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5">
              <p className="text-xs text-gray-400">Category</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                {product.category?.name || "N/A"}
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 px-3.5 py-2.5">
              <p className="text-xs text-gray-400">Availability</p>
              <p
                className={`text-sm font-semibold mt-0.5 ${
                  inStock ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {inStock ? `In stock (${product.stock})` : "Out of stock"}
              </p>
            </div>
          </div>

          {/* Buttons — desktop */}
          <div className="hidden md:flex gap-3 mt-8">
            <motion.button
              whileHover={{ scale: cartLoading ? 1 : 1.02 }}
              whileTap={{ scale: cartLoading ? 1 : 0.98 }}
              onClick={handleAddToCart}
              disabled={cartLoading || !inStock}
              className="
              flex-1
              flex items-center justify-center gap-2
              border border-gray-300
              text-gray-800
              py-3 rounded-xl
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
              disabled={cartLoading || !inStock}
              className="
              flex-1
              flex items-center justify-center gap-2
              bg-gray-900
              text-white
              py-3 rounded-xl
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

          {!inStock && (
            <p className="mt-3 text-xs text-red-500">
              This product is currently out of stock.
            </p>
          )}
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

      {/* ================= Sticky mobile buy bar ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 flex items-center gap-2.5">
        <div className="mr-1">
          <p className="text-base font-bold text-gray-900 leading-none">
            Rs. {product.finalPrice}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={cartLoading || !inStock}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-800 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          <FaShoppingCart size={13} />
          Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={cartLoading || !inStock}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          <FaBolt size={13} />
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
