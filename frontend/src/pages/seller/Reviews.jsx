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

  const { sellerReviews, loading } = useSelector((state) => state.review);

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

  // ==========================
  // Search + Filter
  // ==========================

  const filteredReviews = useMemo(() => {
    return (
      sellerReviews?.filter((review) => {
        const keyword = search.toLowerCase();

        const matchSearch =
          review.product?.name?.toLowerCase().includes(keyword) ||
          review.user?.name?.toLowerCase().includes(keyword);

        const matchRating =
          ratingFilter === "ALL" || review.rating === Number(ratingFilter);

        return matchSearch && matchRating;
      }) || []
    );
  }, [sellerReviews, search, ratingFilter]);

  return (
    <main className="space-y-8">
      {/* Header */}

      <div className="bg-white rounded-xl border shadow p-6">
        <h1 className="text-3xl font-bold">Product Reviews</h1>

        <p className="text-gray-500 mt-2">
          Manage and monitor customer reviews.
        </p>
      </div>

      {/* Statistics */}

      <ReviewStats reviews={filteredReviews} />

      {/* Search + Filter */}

      <div className="bg-white rounded-xl border shadow p-5 flex flex-col md:flex-row justify-between gap-4">
        <ReviewSearch value={search} onChange={setSearch} />

        <ReviewFilter value={ratingFilter} onChange={setRatingFilter} />
      </div>

      {/* Table */}

      <ReviewTable
        reviews={filteredReviews}
        loading={loading}
        onView={handleViewReview}
      />

      {/* Modal */}

      <ReviewDetailsModal
        isOpen={openModal}
        review={selectedReview}
        onClose={() => setOpenModal(false)}
      />
    </main>
  );
}

export default Reviews;
