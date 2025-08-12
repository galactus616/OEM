import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireEmailVerification = false,
}) => {
  const {
    isAuthenticated,
    user,
    isEmailVerified,
    isInitialized,
    initializeAuth,
  } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Initialize auth state on component mount
    if (!isInitialized) {
      initializeAuth();
    }
  }, [initializeAuth, isInitialized]);

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="large" text="Loading..." variant="pulse" />
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but email is not verified, and trying to access protected pages
  if (
    isAuthenticated &&
    !isEmailVerified &&
    requireEmailVerification &&
    location.pathname !== "/verify-email"
  ) {
    return <Navigate to="/verify-email" replace />;
  }

  // If user is authenticated and email is verified, but trying to access auth pages
  if (
    isAuthenticated &&
    isEmailVerified &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If user is authenticated but email not verified, and trying to access auth pages
  if (
    isAuthenticated &&
    !isEmailVerified &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

export default ProtectedRoute;
