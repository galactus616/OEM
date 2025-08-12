const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    faceDescriptor: {
      type: [Number],
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    // Store OTP in plain form (dev/simple) – not recommended for production
    emailVerificationCode: {
      type: String,
      default: null,
      select: false,
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    refreshTokenVersion: {
      type: Number,
      default: 0,
    },
    examsTaken: [
      {
        examId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exam",
        },
        score: Number,
        passed: Boolean,
        submittedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user without password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.emailVerificationCode;
  delete user.emailVerificationExpiresAt;
  return user;
};

module.exports = mongoose.model("User", userSchema);
