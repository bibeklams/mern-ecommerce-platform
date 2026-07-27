import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSync } from "react-icons/fa";

import {
  getAllSellers,
  banUser,
  unbanUser,
  suspendUser,
  unsuspendUser,
} from "../../redux/thunks/userThunk";

import SellerFilter from "../../components/admin/sellers/SellerFilters";
import SellerTable from "../../components/admin/sellers/SellerTable";

import DashboardCard from "../../components/admin/dashboard/DashboardCard";

function Sellers() {
  const dispatch = useDispatch();

  const { sellers, loading } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const filteredSellers = useMemo(() => {
    let data = [...sellers];

    // Search
    if (search) {
      const keyword = search.toLowerCase();

      data = data.filter(
        (seller) =>
          seller.name.toLowerCase().includes(keyword) ||
          seller.email.toLowerCase().includes(keyword),
      );
    }

    // Status Filter
    if (status) {
      data = data.filter((seller) => seller.status === status);
    }

    // Sorting
    switch (sort) {
      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [sellers, search, status, sort]);

  const active = sellers.filter((s) => s.status === "ACTIVE").length;
  const suspended = sellers.filter((s) => s.status === "SUSPENDED").length;
  const banned = sellers.filter((s) => s.status === "BANNED").length;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sellers</h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all approved sellers.
          </p>
        </div>

        <button
          onClick={() => dispatch(getAllSellers())}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
        >
          <FaSync size={12} />
          Refresh
        </button>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Sellers"
          value={sellers.length}
          type="sellers"
        />

        <DashboardCard title="Active" value={active} type="delivered" />

        <DashboardCard title="Suspended" value={suspended} type="pending" />

        <DashboardCard title="Banned" value={banned} type="cancelled" />
      </div>

      {/* Filters */}

      <SellerFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
      />

      {/* Table */}

      <SellerTable
        sellers={filteredSellers}
        loading={loading}
        onBan={(id) => dispatch(banUser(id))}
        onUnban={(id) => dispatch(unbanUser(id))}
        onSuspend={(id) => dispatch(suspendUser(id))}
        onUnsuspend={(id) => dispatch(unsuspendUser(id))}
      />
    </div>
  );
}

export default Sellers;
