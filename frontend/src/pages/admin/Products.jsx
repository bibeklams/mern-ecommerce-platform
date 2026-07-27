import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAdminProducts,
  toggleFeatured,
  changeProductStatus,
  deleteProduct,
} from "../../redux/thunks/productThunk";

import ProductTable from "../../components/admin/products/ProductTable";
import ProductFilter from "../../components/admin/products/ProductFilter";

import PageNumber from "../../components/common/PageNumber";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaStar,
  FaTimesCircle,
} from "react-icons/fa";

function Products() {
  const dispatch = useDispatch();

  const { adminProducts, totalPages, currentPage, loading } = useSelector(
    (state) => state.product,
  );

  // ==========================
  // Filters
  // ==========================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [featured, setFeatured] = useState("");

  const [sort, setSort] = useState("-createdAt");

  const [page, setPage] = useState(1);

  // ==========================
  // Load Products
  // ==========================

  useEffect(() => {
    dispatch(
      getAdminProducts({
        page,
        search,
        status,
        featured,
        sort,
      }),
    );
  }, [dispatch, page, search, status, featured, sort]);

  // ==========================
  // Statistics
  // ==========================

  const totalProducts = adminProducts.length;

  const activeProducts = useMemo(() => {
    return adminProducts.filter((product) => product.status === "ACTIVE")
      .length;
  }, [adminProducts]);

  const inactiveProducts = useMemo(() => {
    return adminProducts.filter((product) => product.status === "INACTIVE")
      .length;
  }, [adminProducts]);

  const featuredProducts = useMemo(() => {
    return adminProducts.filter((product) => product.isFeatured).length;
  }, [adminProducts]);

  // ==========================
  // Actions
  // ==========================

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;

    dispatch(deleteProduct(id));
  };

  const handleToggleFeatured = (id) => {
    dispatch(toggleFeatured(id));
  };

  const handleToggleStatus = (id, status) => {
    dispatch(
      changeProductStatus({
        id,
        status,
      }),
    );
  };
  return (
    <div className="space-y-6">
      {/* ==========================
          Header
      ========================== */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>

          <p className="mt-1 text-gray-500">
            Manage all products across the marketplace.
          </p>
        </div>
      </div>

      {/* ==========================
          Statistics
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total */}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>

              <h2 className="text-3xl font-bold mt-2">{totalProducts}</h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <FaBoxOpen className="text-indigo-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Active */}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Products</p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">
                {activeProducts}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Featured */}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Featured Products</p>

              <h2 className="text-3xl font-bold mt-2 text-yellow-600">
                {featuredProducts}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <FaStar className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        {/* Inactive */}

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Inactive Products</p>

              <h2 className="text-3xl font-bold mt-2 text-red-600">
                {inactiveProducts}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <FaTimesCircle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================
          Filters
      ========================== */}

      <ProductFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        featured={featured}
        setFeatured={setFeatured}
        sort={sort}
        setSort={setSort}
      />
      {/* ==========================
          Products Table
      ========================== */}

      <ProductTable
        products={adminProducts}
        loading={loading}
        onToggleFeatured={handleToggleFeatured}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />

      {/* ==========================
          Pagination
      ========================== */}

      <PageNumber
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Products;
