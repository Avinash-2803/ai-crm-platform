import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRole,
}) {

  const token =
    localStorage.getItem("access");

  const role =
    localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (allowedRole && role !== allowedRole) {

    if (role === "ADMIN") {
      return <Navigate to="/admin" />;
    }

    if (role === "AGENT") {
      return <Navigate to="/agent" />;
    }

    if (role === "CUSTOMER") {
      return <Navigate to="/customer" />;
    }

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;