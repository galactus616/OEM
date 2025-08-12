import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Briefcase,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Helper component for form input fields for cleaner code
const InputField = ({
  icon,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  children,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
    />
    {children}
  </div>
);

// Main Register Component
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    isLoading,
    error,
    clearError,
    isAuthenticated,
    user,
    isEmailVerified,
  } = useAuthStore();

  // State management for form data and password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  // Handle navigation after successful registration
  useEffect(() => {
    if (isAuthenticated && user && !isEmailVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [isAuthenticated, user, isEmailVerified, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handles changes in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("");
    }
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    return true;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    const result = await register(userData);

    if (result.success) {
      // Navigation will be handled by useEffect
    }
    // Error handling is done in the store
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white dark:bg-gray-800/50 rounded-2xl shadow-2xl overflow-hidden m-4">
        {/* Left Column: Register Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ExamPortal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
              Join our exam portal and start your learning journey today.
            </p>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                icon={<User className="w-5 h-5 text-gray-400" />}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />

              <InputField
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />

              <InputField
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </InputField>

              <InputField
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              >
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-300 cursor-pointer"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </InputField>

              <div className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 bg-gray-100 dark:bg-gray-700 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2"
                />
                <label className="text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Error Display */}
              {(error || validationError) && (
                <div className="text-sm text-center p-3 rounded-xl border bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30">
                  {error || validationError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 cursor-pointer bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner
                      size="small"
                      color="white"
                      text=""
                      variant="dots"
                    />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-10 text-center text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-300"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Illustration & Features */}
        <div className="hidden lg:flex w-1/2 bg-purple-700 p-12 flex-col items-center justify-center relative overflow-hidden">
          <button
            onClick={() => navigate("/")}
            className="absolute cursor-pointer top-8 left-8 z-50 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 transition-colors duration-300 shadow-md"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          {/* Background decorative shapes */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600 rounded-full opacity-30"></div>
          <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-purple-800 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center text-white">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-white/20 shadow-lg">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Start Your Learning Journey Today
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed max-w-md mx-auto">
              Join thousands of students who trust our platform for their online
              examinations and assessments.
            </p>

            {/* Feature highlights */}
            <div className="mt-12 grid grid-cols-2 gap-6 text-left">
              {[
                "Secure Testing",
                "Real-time Results",
                "Progress Tracking",
                "Expert Support",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                    <span className="text-lg">
                      {["🔒", "⚡", "📈", "🎯"][i]}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-purple-50">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
