const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["BUG", "FEEDBACK", "QUERY"],
  },
  feedback: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
