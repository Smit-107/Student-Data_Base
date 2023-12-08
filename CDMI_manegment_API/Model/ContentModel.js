const mongoose = require("mongoose");
// npm install validator
const validator = require("validator");
const contentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "content name require"],
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Enter content name");
      }
    },
  },
  course_id: { type: String },
  duration: { type: String, required: [true, "Duration require"] },
  total_fees: {
    type: Number,
    required: [true, "Total Fees require"],
  },
});

const ContentModel = mongoose.model("Content", contentSchema);

module.exports = ContentModel;
