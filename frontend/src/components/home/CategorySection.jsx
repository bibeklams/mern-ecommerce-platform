import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

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
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
        </motion.div>

        {/* Categories */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/product?category=${category._id}`)}
              className="
                bg-white
                rounded-xl
                border border-gray-200
                p-5
                hover:border-gray-300 hover:shadow-sm
                transition-colors
                duration-200
              "
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={category.image?.url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mt-3.5 text-sm font-semibold text-gray-800">
                {category.name}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
