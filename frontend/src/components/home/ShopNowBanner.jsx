import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa";

import image from "../../assets/banner.jpg";

function ShopNowBanner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              New arrivals weekly
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              Shop smart.
              <br />
              Shop <span className="text-indigo-600">better.</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-sm leading-relaxed">
              Discover thousands of premium products at unbeatable prices.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Shop Now
                <FaArrowRight size={11} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClick}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                Create Account
              </motion.button>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/10]">
              <img
                src={image}
                alt="Featured products on ShopVerse"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ShopNowBanner;
