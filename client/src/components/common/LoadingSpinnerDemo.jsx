import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

/**
 * LoadingSpinnerDemo - A demo component to showcase all spinner variants
 * This component can be used for testing and showcasing different spinner styles
 */
const LoadingSpinnerDemo = () => {
  const [selectedColor, setSelectedColor] = useState("purple");
  const [selectedSize, setSelectedSize] = useState("default");
  const [selectedVariant, setSelectedVariant] = useState("pulse");

  const colors = ["purple", "blue", "green", "red", "gray", "white"];
  const sizes = ["small", "default", "large", "xlarge", "xxlarge"];
  const variants = ["pulse", "dots", "bars", "ripple", "orbit", "gradient"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Beautiful Loading Spinners
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore different variants, colors, and sizes
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedColor === color
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedVariant === variant
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Live Preview
          </h2>
          <div className="flex justify-center">
            <LoadingSpinner
              size={selectedSize}
              color={selectedColor}
              text={`${selectedVariant} spinner`}
              variant={selectedVariant}
            />
          </div>
        </div>

        {/* All Variants Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant) => (
            <div
              key={variant}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center capitalize">
                {variant}
              </h3>
              <div className="flex justify-center mb-4">
                <LoadingSpinner
                  size="large"
                  color="purple"
                  text=""
                  variant={variant}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {variant === "pulse" &&
                  "Smooth pulsing animation with ping effect"}
                {variant === "dots" && "Bouncing dots with staggered timing"}
                {variant === "bars" && "Animated bars with wave effect"}
                {variant === "ripple" &&
                  "Ripple effect with layered animations"}
                {variant === "orbit" && "Multi-layered orbital rotation"}
                {variant === "gradient" && "Gradient ring with spinning effect"}
              </p>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Usage Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Button Loading States
              </h3>
              <div className="space-y-2">
                <button className="w-full py-3 bg-purple-600 text-white rounded-lg flex items-center justify-center gap-2">
                  <LoadingSpinner
                    size="small"
                    color="white"
                    text=""
                    variant="dots"
                  />
                  <span>Loading...</span>
                </button>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
                  <LoadingSpinner
                    size="small"
                    color="white"
                    text=""
                    variant="bars"
                  />
                  <span>Processing...</span>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Page Loading States
              </h3>
              <div className="space-y-2">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <LoadingSpinner
                    size="default"
                    color="purple"
                    text="Loading data..."
                    variant="ripple"
                  />
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <LoadingSpinner
                    size="large"
                    color="green"
                    text="Saving..."
                    variant="gradient"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinnerDemo;
