import { FaStore } from "react-icons/fa";

import SellerStatusBadge from "./SellerStatusBadge";
import SellerActionMenu from "./SellerActionMenu";

function SellerRow({
  seller,

  onBan,
  onUnban,

  onSuspend,
  onUnsuspend,
}) {
  const joinedDate = new Date(seller.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Seller */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {seller.avatar?.secure_url ? (
            <img
              src={seller.avatar.secure_url}
              alt={seller.name}
              className="w-11 h-11 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
              <FaStore className="text-blue-600" size={18} />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900">{seller.name}</h3>

            <p className="text-xs text-gray-500">ID: {seller._id.slice(-6)}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-gray-600">{seller.email}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <SellerStatusBadge status={seller.status} />
      </td>

      {/* Joined */}
      <td className="px-6 py-4 text-gray-500">{joinedDate}</td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <SellerActionMenu
            seller={seller}
            onBan={onBan}
            onUnban={onUnban}
            onSuspend={onSuspend}
            onUnsuspend={onUnsuspend}
          />
        </div>
      </td>
    </tr>
  );
}

export default SellerRow;
