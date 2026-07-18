import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { getProfile, refreshUser } from "./redux/thunks/authThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const result = await dispatch(getProfile());

      if (getProfile.rejected.match(result)) {
        const refresh = await dispatch(refreshUser());

        if (refreshUser.fulfilled.match(refresh)) {
          await dispatch(getProfile());
        }
      }
    };

    loadUser();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
