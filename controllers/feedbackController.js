const Feedback = require("../database/models/Feedback");

exports.submitFeedback = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, feedback } = req.body;
    const newFeedback = await new Feedback({
      userId,
      type: type.toUpperCase(),
      feedback,
    });
    await newFeedback.save();

    res.status(200).send("Feedback submitted successfully!");
  } catch (error) {
    console.log("Error in feedbackController.submitFeedback", error);
    res.status(400).send("Could not submit feedback!");
  }
};
