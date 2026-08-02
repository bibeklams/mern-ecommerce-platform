import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routes/AppRoutes";

import { getProfile, refreshUser } from "./redux/thunks/authThunk";
import { countNotification } from "./redux/thunks/notificationThunk";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  // Load logged-in user
  useEffect(() => {
    const loadUser = async () => {
      const result = await dispatch(getProfile());

      // access token expired
      if (getProfile.rejected.match(result)) {
        const refresh = await dispatch(refreshUser());

        if (refreshUser.fulfilled.match(refresh)) {
          await dispatch(getProfile());
        }
      }
    };

    loadUser();
  }, [dispatch]);

  // Load notification count
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(countNotification());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <AppRoutes />

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
}

export default App;
