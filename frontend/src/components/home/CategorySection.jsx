import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllCategories } from "../../redux/thunks/categoryThunk";

function CategorySection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-44 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>

          <button
            onClick={() => navigate("/products")}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View All →
          </button>
        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => navigate(`/products?category=${category._id}`)}
              className="
                bg-white
                rounded-xl
                border
                p-5
                hover:shadow-lg
                hover:-translate-y-1
                transition
                duration-300
              "
            >
              <img
                src={category.image?.secure_url}
                alt={category.name}
                className="w-20 h-20 mx-auto object-cover rounded-full"
              />

              <h3 className="mt-4 font-semibold text-gray-800">
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
