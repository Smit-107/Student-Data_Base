const ContentModel = require("../Model/ContentModel");
const CourseModel = require("../Model/CourseModel");

exports.addContent = async (req, res) => {
  try {
    const courseId = req.body.course_id;
    const findData = await CourseModel.findById(courseId);

    if (findData.content_id) {
      var exist_content_id = findData.content_id;
      var data = await ContentModel.findById(exist_content_id);
      if (data) {
        var content_data = data.content.split(",");
        var new_content_data = req.body.content.split(",");
        var new_content = new_content_data.filter(
          (content) => !content_data.includes(content)
        );
        var update_content = content_data.concat(new_content);
        var update_content_string = update_content.join(",");
        if (req.body.duration) {
          var obj = {
            content: update_content_string,
            duration: req.body.duration,
            total_fees: req.body.total_fees,
          };
        } else {
          var obj = {
            content: update_content_string,
          };
        }
        var data1 = await ContentModel.findByIdAndUpdate(data._id, obj, {
          new: true,
        });
        res.status(200).json({
          status: "Content Add Successfully",
          data1,
        });
      }
    } else {
      const data = await ContentModel.create(req.body);
      const obj = {
        content_id: data._id,
      };
      await CourseModel.findByIdAndUpdate(courseId, obj, { new: true });
      res.status(200).json({
        status: "Content Add Successfully",
        data,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================ View Single course =========================
exports.viewsingleContent = async (req, res) => {
  try {
    id = req.params.id;
    var data = await ContentModel.findById(id);
    var find_coursename = await CourseModel.findById({ _id: data.course_id });
    var coursename = find_coursename.coursename;
    res.status(200).json({
      status: "single Content Find Successfully",
      data,
      coursename,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================ View Single course =========================
exports.updateContent = async (req, res) => {
  try {
    id = req.body.content_id;
    var obj = {
      content: req.body.content,
      duration: req.body.duration,
      total_fees: req.body.total_fees,
    };
    await ContentModel.findByIdAndUpdate(id, obj, { new: true });

    res.status(200).json({
      status: "Content update Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ==================== Delete Content =========================
exports.DeleteContent = async (req, res) => {
  try {
    id = req.params.id;
    await ContentModel.findByIdAndDelete(id);

    const findCourseByContent = await CourseModel.find({ content_id: id });

    if (findCourseByContent.length > 0) {
      findCourseByContent.forEach(async (course) => {
        course.content_id = null;
        await course.save();
      });
    }

    res.status(200).json({
      status: "Content Delete Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
