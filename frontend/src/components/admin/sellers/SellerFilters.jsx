import { FaSearch } from "react-icons/fa";

function SellerFilter({ search, setSearch, status, setStatus, sort, setSort }) {
  const selectClass =
    "px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 outline-none focus:border-gray-300 focus:ring-2 focus:ring-gray-900/10 transition-colors";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search seller..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:bg-white focus:border-gray-300 focus:ring-2 focus:ring-gray-900/10 transition-colors"
          />
        </div>

        {/* Account Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="BANNED">Banned</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectClass}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">Name A-Z</option>
          <option value="za">Name Z-A</option>
        </select>
      </div>
    </div>
  );
}

export default SellerFilter;
