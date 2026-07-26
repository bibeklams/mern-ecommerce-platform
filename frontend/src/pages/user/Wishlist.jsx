import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getMyWishlist,
  removeFromWishlist,
} from "../../redux/thunks/wishlistThunk";

function Wishlist() {
  const dispatch = useDispatch();

  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getMyWishlist());
  }, [dispatch]);

  const handleRemove = async (productId) => {
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
      toast.success("Removed from wishlist.");
      dispatch(getMyWishlist());
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 text-center">Loading...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center">
          <h2 className="font-semibold text-lg">Your wishlist is empty</h2>

          <p className="text-gray-500 mt-2">Add products you like.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border overflow-hidden"
            >
              <Link to={`/product/${item.product._id}`}>
                <img
                  src={item.product.images[0]?.secure_url}
                  alt={item.product.name}
                  className="w-full h-52 object-contain bg-gray-100"
                />
              </Link>

              <div className="p-4">
                <h2 className="font-semibold">{item.product.name}</h2>

                <p className="text-gray-500 text-sm">{item.product.brand}</p>

                <p className="text-lg font-bold mt-2">
                  Rs. {item.product.finalPrice.toLocaleString()}
                </p>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="mt-4 w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
