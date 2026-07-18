import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { getProfile } from "./redux/thunks/authThunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
