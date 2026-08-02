import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserCheck, FaStore } from "react-icons/fa";

import UserSearch from "../../components/admin/users/UserSearch";
import UserTable from "../../components/admin/users/UserTable";
import PageNumber from "../../components/common/PageNumber";

import {
  getAllUsers,
  banUser,
  unbanUser,
  suspendUser,
  unsuspendUser,
  approveSeller,
  rejectSeller,
} from "../../redux/thunks/userThunk";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users = [],
    loading,
    error,
    page,
    pages,
  } = useSelector((state) => state.user);

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
  // Refresh Users
  // ==========================

  const refreshUsers = () => {
    dispatch(
      getAllUsers({
        page: currentPage,
        limit: 10,
      }),
    );
  };

  // ==========================
  // Ban
  // ==========================

  const handleBan = async (id) => {
    try {
      const result = await dispatch(banUser(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  // ==========================
  // Unban
  // ==========================

  const handleUnban = async (id) => {
    try {
      const result = await dispatch(unbanUser(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  // ==========================
  // Suspend
  // ==========================

  const handleSuspend = async (id) => {
    try {
      const result = await dispatch(suspendUser(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  // ==========================
  // Unsuspend
  // ==========================

  const handleUnsuspend = async (id) => {
    try {
      const result = await dispatch(unsuspendUser(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  // ==========================
  // Approve Seller
  // ==========================

  const handleApproveSeller = async (id) => {
    try {
      const result = await dispatch(approveSeller(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  // ==========================
  // Reject Seller
  // ==========================

  const handleRejectSeller = async (id) => {
    try {
      const result = await dispatch(rejectSeller(id)).unwrap();

      toast.success(result.message);

      refreshUsers();
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage users, accounts and seller applications.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Users</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <FaUsers size={14} />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {users.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Active Users</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <FaUserCheck size={14} />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-emerald-600 mt-3">
            {users.filter((user) => user.status === "ACTIVE").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Seller Requests</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FaStore size={14} />
            </span>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 mt-3">
            {users.filter((user) => user.sellerStatus === "PENDING").length}
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
        onApproveSeller={handleApproveSeller}
        onRejectSeller={handleRejectSeller}
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
