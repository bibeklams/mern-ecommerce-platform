import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaStore, FaCheckCircle, FaClock } from "react-icons/fa";

import { applyForSeller } from "../../redux/thunks/userThunk";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { loading } = useSelector((state) => state.user);

  const handleSellerApply = async () => {
    const result = await dispatch(applyForSeller());

    if (applyForSeller.fulfilled.match(result)) {
      toast.success(result.payload.message);
    } else {
      toast.error(result.payload);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-7">
        {/* Profile Header */}

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>

            <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
          </div>
        </div>

        {/* Account Information */}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                <FaUser size={14} />
              </span>

              <div>
                <p className="text-xs text-gray-500">Account Role</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 shrink-0">
                <FaStore size={14} />
              </span>

              <div>
                <p className="text-xs text-gray-500">Seller Status</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {user.sellerStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Section */}

        {user.role === "USER" && user.sellerStatus === "NONE" && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="font-semibold text-sm text-gray-900">
              Become a seller
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-4">
              Start selling your products on ShopVerse.
            </p>

            <button
              onClick={handleSellerApply}
              disabled={loading}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {loading ? "Submitting..." : "Apply for Seller"}
            </button>
          </div>
        )}

        {user.sellerStatus === "PENDING" && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <FaClock size={14} />
            </span>

            <div>
              <h3 className="text-sm font-semibold text-amber-800">
                Application pending
              </h3>
              <p className="text-sm text-amber-700 mt-0.5">
                Admin will review your seller request.
              </p>
            </div>
          </div>
        )}

        {user.sellerStatus === "APPROVED" && (
          <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <FaCheckCircle size={14} />
            </span>

            <div>
              <h3 className="text-sm font-semibold text-emerald-800">
                Seller account approved
              </h3>
              <p className="text-sm text-emerald-700 mt-0.5">
                You can now sell products on ShopVerse.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
