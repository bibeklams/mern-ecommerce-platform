import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFeaturedProducts } from "../../redux/thunks/productThunk";

import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const dispatch = useDispatch();

  const { featuredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold">🔥 Trending Hot Products</h2>

      <div
        className="
grid
grid-cols-2
md:grid-cols-4
gap-5
mt-6
"
      >
        {featuredProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
