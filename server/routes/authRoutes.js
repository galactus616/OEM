const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  resendVerification,
  verifyEmail,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutUser);

// Verification routes
router.post("/resend-verification", protect, resendVerification);
router.post("/verify-email", protect, verifyEmail);

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

module.exports = router;
