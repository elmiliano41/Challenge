import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LoadingComponent } from "../components/LoadingComponent";

const ProtectedRoutes = ({ adminOnly = false }) => {
  const { auth, loading } = useAuth();

  if (loading) return <LoadingComponent />;

  if (!auth.userToken) return <Navigate to="/" />;

  if (adminOnly && !auth.isAdmin) return <Navigate to="/dashboard" />;

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default ProtectedRoutes;