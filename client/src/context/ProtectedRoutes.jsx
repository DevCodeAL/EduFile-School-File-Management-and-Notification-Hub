import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>{''}</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user?.data.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
