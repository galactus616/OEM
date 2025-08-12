const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedIndex: {
      type: Number,
      required: true,
      min: 0,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
      index: true,
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    startedAt: { type: Date, required: true },
    submittedAt: { type: Date, required: true },

    // Proctoring fields
    warningCount: { type: Number, default: 0 },
    maxWarnings: { type: Number, default: 3 },
    isEjected: { type: Boolean, default: false },
    ejectedAt: { type: Date },
    ejectionReason: { type: String },

    // Legacy fields (keeping for compatibility)
    endedDueToCheating: { type: Boolean, default: false },
    cheatingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

resultSchema.index({ userId: 1, examId: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema);
