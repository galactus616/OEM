const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    options: {
      type: [
        {
          type: String,
          trim: true,
          required: true,
        },
      ],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length === 4;
        },
        message: "A question must have exactly 4 options",
      },
      required: true,
    },
    correctIndex: {
      type: Number,
      required: [true, "Correct option index is required"],
      min: [0, "correctIndex must be >= 0"],
      max: [3, "correctIndex must be <= 3"],
      validate: {
        validator: function (val) {
          return (
            Number.isInteger(val) && this.options && val < this.options.length
          );
        },
        message: "correctIndex must be a valid index of options",
      },
      select: false, // hide by default when fetching questions for exam
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
