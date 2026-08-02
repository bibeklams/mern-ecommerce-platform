import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReviewStats from "../../components/seller/review/ReviewStats";
import ReviewSearch from "../../components/seller/review/ReviewSearch";
import ReviewFilter from "../../components/seller/review/ReviewFilter";
import ReviewTable from "../../components/seller/review/ReviewTable";
import ReviewDetailsModal from "../../components/seller/review/ReviewDetailsModal";

import { getSellerReviews } from "../../redux/thunks/reviewThunk";

function Reviews() {
  const dispatch = useDispatch();

  const {
    sellerReviews = [],
    loading,
    error,
  } = useSelector((state) => state.review);

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  const [selectedReview, setSelectedReview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getSellerReviews());
  }, [dispatch]);

  // ==========================
  // View Review
  // ==========================

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReview(null);
  };

  // ==========================
  // Search + Filter
  // ==========================

  const filteredReviews = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return sellerReviews.filter((review) => {
      const productName = review.product?.name?.toLowerCase() || "";

      const customerName = review.user?.name?.toLowerCase() || "";

      const matchSearch =
        productName.includes(keyword) || customerName.includes(keyword);

      const matchRating =
        ratingFilter === "ALL" || review.rating === Number(ratingFilter);

      return matchSearch && matchRating;
    });
  }, [sellerReviews, search, ratingFilter]);

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin" />
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <main className="space-y-8">
      {/* ================= Header ================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>

        <p className="text-gray-500 mt-2">
          Monitor customer feedback and product ratings.
        </p>
      </div>

      {/* ================= Statistics ================= */}

      <ReviewStats reviews={filteredReviews} />

      {/* ================= Search + Filter ================= */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col md:flex-row gap-4 justify-between">
        <ReviewSearch value={search} onChange={setSearch} />

        <ReviewFilter value={ratingFilter} onChange={setRatingFilter} />
      </div>

      {/* ================= Reviews ================= */}

      {filteredReviews.length > 0 ? (
        <ReviewTable
          reviews={filteredReviews}
          loading={loading}
          onView={handleViewReview}
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm py-16 px-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            No Reviews Found
          </h3>

          <p className="text-gray-500 mt-2">
            No reviews match your current search or filter.
          </p>
        </div>
      )}

      {/* ================= Review Details ================= */}

      {openModal && selectedReview && (
        <ReviewDetailsModal
          isOpen={openModal}
          review={selectedReview}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default Reviews;
