import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  console.log("Is authenticated in Private routes:", isAuthenticated);
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoutes;
