const ContentModel = require("../Model/ContentModel");
const CourseModel = require("../Model/CourseModel");
// ================ Add New course =========================
exports.addCourse = async (req, res) => {
  try {
    var data = await CourseModel.create(req.body);
    res.status(200).json({
      status: "Course Add Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================ View course =========================
exports.viewCourse = async (req, res) => {
  try {
    var limit = 5;
    var page_no = req.query.page_no;
    var start = (page_no - 1) * limit;
    var total = await CourseModel.find().countDocuments();
    var lastpage = Math.ceil(total / limit);

    var data = await CourseModel.find().skip(start).limit(limit);
    var data1 = await CourseModel.find();

    res.status(200).json({
      status: "All Course Find Successfully",
      data,
      lastpage,
      start,
      data1,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ==================== Update Course =========================
exports.updateCourse = async (req, res) => {
  try {
    id = req.body.course_id;
    var obj = {
      coursename: req.body.coursename,
    };
    var data = await CourseModel.findByIdAndUpdate(id, obj, { new: true });

    res.status(200).json({
      status: "Course Update Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ==================== Delete Course =========================
exports.DeleteCourse = async (req, res) => {
  try {
    id = req.params.id;

    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({
        status: "error",
        error: "Course not found",
      });
    }

    await ContentModel.deleteMany({ course_id: id });

    await CourseModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "Course Delete Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================ View Single course =========================
exports.viewsingleCourse = async (req, res) => {
  try {
    id = req.params.id;
    var data = await CourseModel.findById(id).populate("content_id");
    res.status(200).json({
      status: "single Course Find Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================ View All course =========================

exports.ViewallContent = async (req, res) => {
  try {
    var limit = 5;
    var page_no = req.query.page_no;
    var start = (page_no - 1) * limit;
    var total = await CourseModel.find({
      content_id: { $exists: true, $ne: null },
    }).countDocuments();
    var lastpage = Math.ceil(total / limit);

    var data = await CourseModel.find({
      content_id: { $exists: true, $ne: null },
    })
      .skip(start)
      .limit(limit)
      .populate("content_id");
    res.status(200).json({
      status: "All Course with Content Find Successfully",
      data,
      lastpage,
      start,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================= Search Course ============================
exports.SearchCourse = async (req, res) => {
  try {
    var limit = 5;
    var page_no = req.query.page_no;
    var start = (page_no - 1) * limit;
    var search = req.query.search;
    var regex = new RegExp(search, "i");
    var total = await CourseModel.find({
      coursename: { $regex: regex },
    }).countDocuments();
    var lastpage = Math.ceil(total / limit);
    var data = await CourseModel.find({ coursename: { $regex: regex } })
      .skip(start)
      .limit(limit);

    res.status(200).json({
      status: "Search course Successfully",
      data,
      lastpage,
      start,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

// ================= Search Content ============================
exports.SearchContent = async (req, res) => {
  try {
    var limit = 5;
    var page_no = req.query.page_no;
    var start = (page_no - 1) * limit;

    var search = req.query.search;
    var regex = new RegExp(search, "i");
    var total = await CourseModel.find({
      content_id: { $exists: true, $ne: null },
      coursename: { $regex: regex },
    }).countDocuments();
    var data = await CourseModel.find({
      content_id: { $exists: true, $ne: null },
      coursename: { $regex: regex },
    })
      .skip(start)
      .limit(limit)
      .populate("content_id");
    var lastpage = Math.ceil(total / limit);

    res.status(200).json({
      status: "Search content Successfully",
      data,
      lastpage,
      start,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};
