const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail } = require("../utils/email");
const {
  verificationEmailTemplate,
} = require("../utils/templates/verificationEmail");

// Helpers to generate tokens
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_TTL || "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, version: user.refreshTokenVersion },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_TTL || "7d" }
  );
};

const setRefreshCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("jid", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "lax" : "lax",
    path: "/",
    maxAge:
      parseInt(process.env.REFRESH_COOKIE_MAX_AGE_MS || "604800000", 10) ||
      7 * 24 * 60 * 60 * 1000,
  });
};

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendVerificationForUser = async (user) => {
  const code = generateOtp();
  user.emailVerificationCode = code;
  user.emailVerificationExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  await user.save();

  const subject = "Verify Your Email - Online Exam Portal";
  const text = `Hello ${user.name},\n\nYour verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nOnline Exam Portal Team`;
  const html = verificationEmailTemplate({ code, userName: user.name });

  try {
    await sendEmail({ to: user.email, subject, text, html });
  } catch (e) {
    console.error("Failed to send verification email:", e.message);
  }
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, faceDescriptor } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      faceDescriptor: faceDescriptor || null,
    });

    // Send verification OTP
    await sendVerificationForUser(user);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      faceDescriptor: user.faceDescriptor,
      emailVerified: user.emailVerified,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select(
      "+emailVerificationCode +emailVerificationExpiresAt"
    );

    if (!user) {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      faceDescriptor: user.faceDescriptor,
      emailVerified: user.emailVerified,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Resend verification code
// @route   POST /api/auth/resend-verification
// @access  Private (must be logged in)
const resendVerification = async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "+emailVerificationCode +emailVerificationExpiresAt"
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.emailVerified)
    return res.status(400).json({ message: "Email already verified" });

  await sendVerificationForUser(user);
  return res.json({ message: "Verification code sent" });
};

// @desc    Verify email
// @route   POST /api/auth/verify-email
// @access  Private (must be logged in)
const verifyEmail = async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: "Code is required" });

  const user = await User.findById(req.user._id).select(
    "+emailVerificationCode +emailVerificationExpiresAt"
  );

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.emailVerified)
    return res.status(400).json({ message: "Email already verified" });

  if (!user.emailVerificationCode || !user.emailVerificationExpiresAt)
    return res.status(400).json({ message: "No active verification request" });

  if (user.emailVerificationExpiresAt < new Date()) {
    return res.status(400).json({ message: "Code expired" });
  }

  const isMatch = user.emailVerificationCode === code;

  if (!isMatch) return res.status(400).json({ message: "Invalid code" });

  user.emailVerified = true;
  user.emailVerificationCode = null;
  user.emailVerificationExpiresAt = null;
  await user.save();

  return res.json({
    message: "Email verified",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      faceDescriptor: user.faceDescriptor,
      emailVerified: user.emailVerified,
    },
  });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (uses HttpOnly cookie)
const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies?.jid;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (payload.version !== user.refreshTokenVersion) {
      return res.status(401).json({ message: "Refresh token invalidated" });
    }

    // Rotate refresh token
    user.refreshTokenVersion += 1;
    await user.save();

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    setRefreshCookie(res, newRefreshToken);

    return res.json({
      accessToken: newAccessToken,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};

// @desc    Logout
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = async (_req, res) => {
  // Clear cookie
  res.clearCookie("jid", {
    httpOnly: true,
    sameSite: "lax",
    path: "/", // Changed from "/api/auth/refresh" to "/" for broader access
  });
  return res.json({ message: "Logged out" });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.faceDescriptor = req.body.faceDescriptor || user.faceDescriptor;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        faceDescriptor: updatedUser.faceDescriptor,
        emailVerified: updatedUser.emailVerified,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  resendVerification,
  verifyEmail,
  refreshAccessToken,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
