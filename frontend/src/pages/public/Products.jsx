import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import PageNumber from "../../components/common/PageNumber";

import { getAllProducts } from "../../redux/thunks/productThunk";

function Products() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const { products, loading, error, page, totalPages } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(
      getAllProducts({
        page: 1,
        category,
      }),
    );
  }, [dispatch, category]);

  const handlePageChange = (newPage) => {
    dispatch(
      getAllProducts({
        page: newPage,
        category,
      }),
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found</div>
      ) : (
        <>
          <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-6
              "
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}

          <PageNumber
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Products;
