import UserRow from "./UserRow";
import UserSkeleton from "./UserSkeleton";

function UserTable({
  users = [],
  loading,

  onBan,
  onUnban,

  onSuspend,
  onUnsuspend,

  onApproveSeller,
  onRejectSeller,
}) {
  if (loading) {
    return <UserSkeleton />;
  }

  // Show seller column only if seller feature is used
  const showSellerStatus = users.some(
    (user) =>
      user.role === "SELLER" ||
      user.sellerStatus === "PENDING" ||
      user.sellerStatus === "APPROVED" ||
      user.sellerStatus === "REJECTED",
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-4 font-semibold">User</th>

              <th className="px-6 py-4 font-semibold">Email</th>

              <th className="px-6 py-4 font-semibold">Role</th>

              {showSellerStatus && (
                <th className="px-6 py-4 font-semibold">Seller Status</th>
              )}

              <th className="px-6 py-4 font-semibold">Status</th>

              <th className="px-6 py-4 font-semibold">Joined</th>

              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={showSellerStatus ? 7 : 6}
                  className="
                    px-6
                    py-12
                    text-center
                    text-gray-500
                    "
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  showSellerStatus={showSellerStatus}
                  onBan={onBan}
                  onUnban={onUnban}
                  onSuspend={onSuspend}
                  onUnsuspend={onUnsuspend}
                  onApproveSeller={onApproveSeller}
                  onRejectSeller={onRejectSeller}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
