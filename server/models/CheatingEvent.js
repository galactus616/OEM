const mongoose = require("mongoose");

const cheatingEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "NO_FACE",
        "MULTIPLE_FACES",
        "LOOKING_AWAY",
        "TAB_SWITCH",
        "WINDOW_BLUR",
        "MIC_MUTED",
        "HEAD_MOVEMENT",
        "PHONE_USAGE",
        "OTHER",
      ],
      required: true,
    },
    occurredAt: { type: Date, default: Date.now },
    meta: { type: Object, default: {} },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    // Warning system fields
    warningNumber: { type: Number }, // 1, 2, 3
    isWarning: { type: Boolean, default: true },
    isEjection: { type: Boolean, default: false },
    ejectionReason: { type: String },

    // Response tracking
    acknowledgedByUser: { type: Boolean, default: false },
    acknowledgedAt: { type: Date },
  },
  { timestamps: true }
);

cheatingEventSchema.index({ examId: 1, userId: 1, occurredAt: 1 });
cheatingEventSchema.index({ examId: 1, userId: 1, isWarning: 1 });

module.exports = mongoose.model("CheatingEvent", cheatingEventSchema);
