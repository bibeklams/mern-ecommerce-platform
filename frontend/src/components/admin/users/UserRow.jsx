import { FaUserCircle, FaCheck, FaTimes } from "react-icons/fa";

import UserStatusBadge from "./UserStatusBadge";
import UserActionMenu from "./UserActionMenu";

function UserRow({
  user,

  showSellerStatus,

  onBan,
  onUnban,

  onSuspend,
  onUnsuspend,

  onApproveSeller,
  onRejectSeller,
}) {
  const createdDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* USER */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {user.avatar?.secure_url ? (
            <img
              src={user.avatar.secure_url}
              alt={user.name}
              className="
                w-10
                h-10
                rounded-full
                object-cover
                border
                border-gray-200
                "
            />
          ) : (
            <FaUserCircle size={40} className="text-gray-300" />
          )}

          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>

            <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
          </div>
        </div>
      </td>

      {/* EMAIL */}

      <td className="px-6 py-4 text-gray-600">{user.email}</td>

      {/* ROLE */}

      <td className="px-6 py-4">
        <span
          className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold

          ${
            user.role === "ADMIN"
              ? "bg-purple-100 text-purple-700"
              : user.role === "SELLER"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
          }
          `}
        >
          {user.role}
        </span>
      </td>

      {/* SELLER STATUS */}

      {showSellerStatus && (
        <td className="px-6 py-4">
          {user.sellerStatus === "PENDING" && (
            <span
              className="
              px-3 py-1
              rounded-full
              text-xs
              font-semibold
              bg-yellow-100
              text-yellow-700
              "
            >
              Pending
            </span>
          )}

          {user.sellerStatus === "APPROVED" && (
            <span
              className="
              px-3 py-1
              rounded-full
              text-xs
              font-semibold
              bg-green-100
              text-green-700
              "
            >
              Approved
            </span>
          )}

          {user.sellerStatus === "REJECTED" && (
            <span
              className="
              px-3 py-1
              rounded-full
              text-xs
              font-semibold
              bg-red-100
              text-red-700
              "
            >
              Rejected
            </span>
          )}

          {user.sellerStatus === "NONE" && (
            <span className="text-gray-400 text-xs">-</span>
          )}
        </td>
      )}

      {/* ACCOUNT STATUS */}

      <td className="px-6 py-4">
        <UserStatusBadge status={user.status} />
      </td>

      {/* DATE */}

      <td className="px-6 py-4 text-gray-500">{createdDate}</td>

      {/* ACTION */}

      <td className="px-6 py-4">
        <div className="flex justify-end gap-2 items-center">
          {user.sellerStatus === "PENDING" && (
            <>
              <button
                onClick={() => onApproveSeller(user._id)}
                className="
                flex
                items-center
                gap-1
                px-3
                py-2
                rounded-lg
                text-sm
                bg-green-100
                text-green-700
                hover:bg-green-200
                "
              >
                <FaCheck size={13} />
                Approve
              </button>

              <button
                onClick={() => onRejectSeller(user._id)}
                className="
                flex
                items-center
                gap-1
                px-3
                py-2
                rounded-lg
                text-sm
                bg-red-100
                text-red-700
                hover:bg-red-200
                "
              >
                <FaTimes size={13} />
                Reject
              </button>
            </>
          )}

          <UserActionMenu
            user={user}
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

export default UserRow;
