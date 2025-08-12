const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Exam title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject is required"],
    },
    durationMinutes: {
      type: Number,
      required: [true, "Duration (minutes) is required"],
      min: [1, "Duration must be at least 1 minute"],
    },
    passPercentage: {
      type: Number,
      default: 60,
      min: [1, "Pass percentage must be between 1 and 100"],
      max: [100, "Pass percentage must be between 1 and 100"],
    },
    scheduledStartTime: {
      type: Date,
      required: [true, "Scheduled start time is required"],
    },
    scheduledEndTime: {
      type: Date,
      required: [true, "Scheduled end time is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: false, // admin can prepare exam but not publish until ready
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for efficient querying of active, published exams
examSchema.index({ isActive: 1, isPublished: 1, scheduledStartTime: 1 });

module.exports = mongoose.model("Exam", examSchema);
