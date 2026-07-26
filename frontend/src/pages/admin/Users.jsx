import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import UserSearch from "../../components/admin/users/UserSearch";
import UserTable from "../../components/admin/users/UserTable";
import PageNumber from "../../components/common/PageNumber";

import {
  getAllUsers,
  banUser,
  unbanUser,
  suspendUser,
  unsuspendUser,
} from "../../redux/thunks/userThunk";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error, page, pages } = useSelector(
    (state) => state.user,
  );

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  // ==========================
  // Fetch Users
  // ==========================

  useEffect(() => {
    dispatch(
      getAllUsers({
        page: currentPage,
        limit: 10,
      }),
    );
  }, [dispatch, currentPage]);

  // ==========================
  // Search + Filter
  // ==========================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const statusMatch = status === "ALL" || user.status === status;

      return searchMatch && statusMatch;
    });
  }, [users, search, status]);

  // ==========================
  // Actions
  // ==========================

  const handleBan = async (id) => {
    try {
      const result = await dispatch(banUser(id)).unwrap();

      toast.success(result.message);

      dispatch(
        getAllUsers({
          page: currentPage,
          limit: 10,
        }),
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUnban = async (id) => {
    try {
      const result = await dispatch(unbanUser(id)).unwrap();

      toast.success(result.message);

      dispatch(
        getAllUsers({
          page: currentPage,
          limit: 10,
        }),
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSuspend = async (id) => {
    try {
      const result = await dispatch(suspendUser(id)).unwrap();

      toast.success(result.message);

      dispatch(
        getAllUsers({
          page: currentPage,
          limit: 10,
        }),
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUnsuspend = async (id) => {
    try {
      const result = await dispatch(unsuspendUser(id)).unwrap();

      toast.success(result.message);

      dispatch(
        getAllUsers({
          page: currentPage,
          limit: 10,
        }),
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        p-6
        space-y-6
      "
    >
      {/* Header */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
          "
        >
          Users Management
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Manage customers, account status and user activities.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-5
        "
      >
        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="text-2xl font-bold mt-2">{users.length}</h2>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">Active Users</p>

          <h2 className="text-2xl font-bold mt-2 text-emerald-600">
            {users.filter((user) => user.status === "ACTIVE").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <p className="text-sm text-gray-500">Blocked Users</p>

          <h2 className="text-2xl font-bold mt-2 text-red-600">
            {users.filter((user) => user.status === "BANNED").length}
          </h2>
        </div>
      </div>

      {/* Search */}

      <UserSearch
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Table */}

      <UserTable
        users={filteredUsers}
        loading={loading}
        onBan={handleBan}
        onUnban={handleUnban}
        onSuspend={handleSuspend}
        onUnsuspend={handleUnsuspend}
        onViewDetails={(id) => navigate(`/admin/users/${id}`)}
      />

      {/* Pagination */}

      <PageNumber
        currentPage={page}
        totalPages={pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Users;
