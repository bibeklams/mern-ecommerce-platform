import { FaUserFriends } from "react-icons/fa";

import SellerRow from "./SellerRow";
import SellerSkeleton from "./SellerSkeleton";

function SellerTable({
  sellers = [],
  loading,

  onBan,
  onUnban,

  onSuspend,
  onUnsuspend,
}) {
  if (loading) {
    return <SellerSkeleton />;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left">
              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Seller
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Email
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Status
              </th>

              <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Joined
              </th>

              <th className="px-6 py-3 text-right font-semibold text-gray-500 text-xs uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {sellers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
                    <FaUserFriends size={16} />
                  </div>
                  <p className="text-sm text-gray-500">No sellers found.</p>
                </td>
              </tr>
            ) : (
              sellers.map((seller) => (
                <SellerRow
                  key={seller._id}
                  seller={seller}
                  onBan={onBan}
                  onUnban={onUnban}
                  onSuspend={onSuspend}
                  onUnsuspend={onUnsuspend}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SellerTable;
