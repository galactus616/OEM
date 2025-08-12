import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoadingSpinnerDemo from "./components/common/LoadingSpinnerDemo";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import LandingPage from "./pages/common/LandingPage";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import EmailVerification from "./pages/common/EmailVerification";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/spinner-demo" element={<LoadingSpinnerDemo />} />

        {/* Protected Routes */}
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute requireAuth={true} requireEmailVerification={false}>
              <EmailVerification />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireAuth={true} requireEmailVerification={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
