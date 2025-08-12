import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, ArrowLeft, Clock, Briefcase } from "lucide-react";
import useAuthStore from "../../store/authStore";
import LoadingSpinner from "../../components/common/LoadingSpinner";

// Main Email Verification Component
const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    verifyEmail,
    resendVerification,
    isLoading,
    error,
    clearError,
    isAuthenticated,
    user,
    isEmailVerified,
  } = useAuthStore();

  // State management
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);

  // Get email from URL params or user state
  useEffect(() => {
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      setEmail(emailFromParams);
    } else if (user?.email) {
      setEmail(user.email);
    }
  }, [searchParams, user]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle navigation after successful verification
  useEffect(() => {
    if (isAuthenticated && user && isEmailVerified) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, isEmailVerified, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handles changes in OTP input fields
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handles backspace to move to the previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handles form submission for verification
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      return; // Let the form validation handle this
    }

    const result = await verifyEmail(otpString);

    if (result.success) {
      // Navigation will be handled by useEffect
    }
    // Error handling is done in the store
  };

  // Handles resending the OTP
  const handleResend = async () => {
    if (!canResend) return;

    const result = await resendVerification();

    if (result.success) {
      setTimer(60);
      setCanResend(false);
      setOtp(new Array(6).fill(""));
    }
    // Error handling is done in the store
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center font-sans">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white dark:bg-gray-800/50 rounded-2xl shadow-2xl overflow-hidden m-4">
        {/* Left Column: Verification Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              Verify Your Email
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base mb-8">
              We've sent a 6-digit verification code to <br />
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {email}
              </span>
            </p>

            {/* Verification Form */}
            <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/50">
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
                    Enter your code
                  </label>
                  <div className="flex gap-2 sm:gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all"
                        required
                      />
                    ))}
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="text-sm text-center p-3 rounded-xl border bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/30">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full cursor-pointer py-3.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner
                        size="small"
                        color="white"
                        text=""
                        variant="ripple"
                      />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify Account"
                  )}
                </button>
              </form>
            </div>

            {/* Resend Section */}
            <div className="mt-8 text-center text-sm">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Didn't receive the code?
              </p>
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Resend code
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>You can resend in {timer}s</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className="hidden lg:flex w-1/2 bg-purple-700 p-12 flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-600 rounded-full opacity-30"></div>
          <div className="absolute -bottom-16 -left-10 w-40 h-40 bg-purple-800 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center text-white">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md border border-white/20 shadow-lg">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Just One More Step...
            </h2>
            <p className="text-lg text-purple-100 leading-relaxed max-w-md mx-auto">
              To ensure the security of your account, please enter the
              verification code sent to your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
