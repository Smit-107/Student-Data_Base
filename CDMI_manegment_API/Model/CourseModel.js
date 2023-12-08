const mongoose = require("mongoose");
// npm install validator
const validator = require("validator");
const ContentModel = require("./ContentModel");

const courseSchema = new mongoose.Schema({
  coursename: {
    type: String,
    unique: true,
    required: [true, "course name require"],
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Enter course name");
      }
    },
  },
  content_id: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
});

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
