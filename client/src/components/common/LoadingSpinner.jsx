import React from "react";

/**
 * LoadingSpinner - A beautiful, theme-aware loading spinner component
 *
 * @param {Object} props
 * @param {string} [props.size="default"] - Size of the spinner: "small", "default", "large", "xlarge", "xxlarge"
 * @param {string} [props.color="purple"] - Color of the spinner: "purple", "blue", "green", "red", "gray", "white"
 * @param {string} [props.text="Loading..."] - Text to display below the spinner (empty string for no text)
 * @param {boolean} [props.fullScreen=false] - Whether to show as full screen overlay
 * @param {string} [props.variant="pulse"] - Animation variant: "pulse", "dots", "bars", "ripple", "orbit"
 *
 * @example
 * // Basic usage
 * <LoadingSpinner />
 *
 * @example
 * // Small white spinner with custom text
 * <LoadingSpinner size="small" color="white" text="Saving..." />
 *
 * @example
 * // Full screen loading with orbit animation
 * <LoadingSpinner fullScreen size="xxlarge" text="Initializing..." variant="orbit" />
 *
 * @example
 * // Button loading state with dots
 * <LoadingSpinner size="small" color="white" text="" variant="dots" />
 */
const LoadingSpinner = ({
  size = "default",
  color = "purple",
  text = "Loading...",
  fullScreen = false,
  variant = "pulse",
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    default: "h-8 w-8",
    large: "h-12 w-12",
    xlarge: "h-16 w-16",
    xxlarge: "h-32 w-32",
  };

  const colorClasses = {
    purple: {
      primary: "border-purple-600",
      secondary: "border-purple-400",
      gradient: "from-purple-500 to-purple-700",
      bg: "bg-purple-600",
      text: "text-purple-600",
    },
    blue: {
      primary: "border-blue-600",
      secondary: "border-blue-400",
      gradient: "from-blue-500 to-blue-700",
      bg: "bg-blue-600",
      text: "text-blue-600",
    },
    green: {
      primary: "border-green-600",
      secondary: "border-green-400",
      gradient: "from-green-500 to-green-700",
      bg: "bg-green-600",
      text: "text-green-600",
    },
    red: {
      primary: "border-red-600",
      secondary: "border-red-400",
      gradient: "from-red-500 to-red-700",
      bg: "bg-red-600",
      text: "text-red-600",
    },
    gray: {
      primary: "border-gray-600",
      secondary: "border-gray-400",
      gradient: "from-gray-500 to-gray-700",
      bg: "bg-gray-600",
      text: "text-gray-600",
    },
    white: {
      primary: "border-white",
      secondary: "border-white/60",
      gradient: "from-white to-gray-200",
      bg: "bg-white",
      text: "text-white",
    },
  };

  const currentColor = colorClasses[color];

  // Pulse Spinner (Default)
  const PulseSpinner = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 ${currentColor.primary} animate-pulse`}
      />
      <div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 ${currentColor.secondary} animate-ping`}
      />
    </div>
  );

  // Dots Spinner
  const DotsSpinner = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${
            size === "small"
              ? "w-1.5 h-1.5"
              : size === "default"
              ? "w-2 h-2"
              : "w-3 h-3"
          } rounded-full ${currentColor.bg} animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  // Bars Spinner
  const BarsSpinner = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`${
            size === "small"
              ? "w-1 h-3"
              : size === "default"
              ? "w-1.5 h-4"
              : "w-2 h-6"
          } ${currentColor.bg} rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  // Ripple Spinner
  const RippleSpinner = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full ${currentColor.bg} animate-ping`}
      />
      <div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 ${currentColor.primary} animate-pulse`}
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  );

  // Orbit Spinner
  const OrbitSpinner = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-2 ${currentColor.primary} animate-spin`}
      />
      <div
        className={`absolute inset-1 rounded-full border-2 border-transparent border-r-2 ${currentColor.secondary} animate-spin`}
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      />
      <div
        className={`absolute inset-2 rounded-full border-2 border-transparent border-b-2 ${currentColor.primary} animate-spin`}
        style={{ animationDuration: "2s" }}
      />
    </div>
  );

  // Gradient Ring Spinner
  const GradientRingSpinner = () => (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-r ${currentColor.gradient} p-0.5 animate-spin`}
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
      </div>
      <div
        className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-transparent border-t-2 ${currentColor.primary} animate-spin`}
        style={{ animationDuration: "1.2s" }}
      />
    </div>
  );

  const getSpinnerComponent = () => {
    switch (variant) {
      case "dots":
        return <DotsSpinner />;
      case "bars":
        return <BarsSpinner />;
      case "ripple":
        return <RippleSpinner />;
      case "orbit":
        return <OrbitSpinner />;
      case "gradient":
        return <GradientRingSpinner />;
      default:
        return <PulseSpinner />;
    }
  };

  const Spinner = () => (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center justify-center">
        {getSpinnerComponent()}
      </div>
      {text && (
        <div className="text-center">
          <p
            className={`text-sm font-medium ${currentColor.text} dark:text-gray-300`}
          >
            {text}
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${currentColor.bg} animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute -inset-8 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="relative z-10">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return <Spinner />;
};

export default LoadingSpinner;
