import { FaSearch, FaFilter } from "react-icons/fa";

function UserSearch({ search, setSearch, status, setStatus }) {
  const STATUS_OPTIONS = [
    {
      value: "ALL",
      label: "All Users",
    },
    {
      value: "ACTIVE",
      label: "Active",
    },
    {
      value: "BANNED",
      label: "Banned",
    },
    {
      value: "SUSPENDED",
      label: "Suspended",
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        p-5
        shadow-sm
        space-y-4
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          lg:items-center
          lg:justify-between
        "
      >
        {/* Search */}

        <div className="relative flex-1">
          <FaSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            size={14}
          />

          <input
            type="text"
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-lg
              border
              border-gray-200
              bg-gray-50
              text-sm
              outline-none
              transition

              focus:bg-white
              focus:border-gray-400
              focus:ring-2
              focus:ring-gray-900/10
            "
          />
        </div>

        {/* Filter */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <FaFilter className="text-gray-400" size={14} />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              px-4
              py-3
              rounded-lg
              border
              border-gray-200
              text-sm
              bg-white
              outline-none
              cursor-pointer

              focus:border-gray-400
            "
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
