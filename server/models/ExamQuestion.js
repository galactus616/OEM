const mongoose = require("mongoose");

const examQuestionSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
    },
    points: {
      type: Number,
      default: 1, // each question worth 1 point by default
    },
  },
  { timestamps: true }
);

// Ensure unique question per exam and unique order per exam
examQuestionSchema.index({ examId: 1, questionId: 1 }, { unique: true });
examQuestionSchema.index({ examId: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("ExamQuestion", examQuestionSchema);
