import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function ProductFilter({
  search,
  setSearch,

  category,
  setCategory,

  categories = [],

  status,
  setStatus,

  featured,
  setFeatured,

  sort,
  setSort,

  onClear,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-5">
        <FaFilter className="text-gray-500" />

        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* Search */}

        <div className="relative">
          <FaSearch
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-10
              pr-4
              py-3
              rounded-lg
              border
              border-gray-300
              focus:ring-2
              focus:ring-indigo-500
              outline-none
            "
          />
        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            w-full
            py-3
            px-3
            rounded-lg
            border
            border-gray-300
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full
            py-3
            px-3
            rounded-lg
            border
            border-gray-300
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        >
          <option value="">All Status</option>

          <option value="ACTIVE">Active</option>

          <option value="INACTIVE">Inactive</option>

          <option value="OUT_OF_STOCK">Out of Stock</option>
        </select>

        {/* Featured */}

        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="
            w-full
            py-3
            px-3
            rounded-lg
            border
            border-gray-300
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        >
          <option value="">All Products</option>

          <option value="true">Featured</option>

          <option value="false">Not Featured</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            w-full
            py-3
            px-3
            rounded-lg
            border
            border-gray-300
            focus:ring-2
            focus:ring-indigo-500
            outline-none
          "
        >
          <option value="-createdAt">Latest</option>

          <option value="createdAt">Oldest</option>

          <option value="price">Price: Low → High</option>

          <option value="-price">Price: High → Low</option>

          <option value="stock">Stock: Low → High</option>

          <option value="-stock">Stock: High → Low</option>

          <option value="name">Name A-Z</option>

          <option value="-name">Name Z-A</option>
        </select>
      </div>

      {/* Clear */}

      <div className="flex justify-end mt-5">
        <button
          onClick={onClear}
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-red-50
            text-red-600
            hover:bg-red-100
            transition
          "
        >
          <FaTimes />
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;
