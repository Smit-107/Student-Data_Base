const admissionModel = require("../Model/AdmissionModel");
const CourseModel = require("../Model/CourseModel");

exports.Addadmission = async (req, res) => {
  var file = req.file.originalname;

  var course_data = await CourseModel.find({ _id: req.body.course });

  if (course_data) {
    const installmentDetails = JSON.parse(req.body.installment_details)?.map(
      (item) => ({
        amount: parseInt(item.amount),
        installment_date: item.installment_date,
        p_status: item.p_status,
      })
    );
    var course = await CourseModel.findById(req.body.course);
    var coursename = course.coursename;
    var obj = {
      surname: req.body.surname,
      studentname: req.body.studentname,
      fathername: req.body.fathername,
      stu_contact_no: req.body.stu_contact_no,
      stu_whatsapp_no: req.body.stu_whatsapp_no,
      parent_contact_no: req.body.parent_contact_no,
      parent_whatsapp_no: req.body.parent_whatsapp_no,
      address: req.body.address,
      dob: req.body.dob,
      image: file,
      qualification: req.body.qualification,
      reference: req.body.reference,
      reference_name: req.body.reference_name,
      course: req.body.course,
      coursename: coursename,
      course_duration: req.body.course_duration,
      daily_time: req.body.daily_time,
      course_content: req.body.course_content,
      total_fees: req.body.total_fees,
      joining_date: req.body.joining_date,
      ending_date: req.body.ending_date,
      job_responsbility: req.body.job_responsbility,
      college_course: req.body.college_course,
      installment_details: installmentDetails,
      faculty: req.body.faculty,
      batch_time: req.body.batch_time,
      running_topic: req.body.running_topic,
      pc_laptop: req.body.pc_laptop,
      pc_no: req.body.pc_no,
      laptop_compulsory: req.body.laptop_compulsory,
      gst: req.body.gst,
      extra_note: req.body.extra_note,
      reception_note: req.body.reception_note,
    };
    console.log(obj);
    var data = await admissionModel.create(obj);
    res.status(200).json({
      status: "Add new admission Successfully",
      data,
    });
  }
};

exports.Student_Detalis = async (req, res) => {
  try {
    var id = req.params.id;
    var data = await admissionModel.findById(id);
    var remaining_fees = data.installment_details.filter(
      (item) => item.p_status === "0"
    );
    //  var data = await CourseModel.findById(id).populate('content_id')
    if (data) {
      var course_id = data.course;
      var courseData = await CourseModel.findById(course_id);
      var coursename = courseData.coursename;
    }
    res.status(200).json({
      status: "View Student_Data Successfully",
      data,
      coursename,
      remaining_fees,
    });
  } catch (error) {
    res.status(400).json({
      status: "Something Wrong",
      error: error.message,
    });
  }
};

exports.updateStudent_Detalis = async (req, res) => {
  try {
    var file = req.body.image || req.file.originalname;
    var id =  req.params.id;
    const installmentDetails = JSON.parse(req.body.installment_details)?.map(
      (item) => ({
        amount: parseInt(item.amount),
        installment_date: item.installment_date,
        p_status: item.p_status,
      })
    );
    var course = await CourseModel.findById(req.body.course);
    var coursename = course.coursename;
    var obj = {
      surname: req.body.surname,
      studentname: req.body.studentname,
      fathername: req.body.fathername,
      stu_contact_no: req.body.stu_contact_no,
      stu_whatsapp_no: req.body.stu_whatsapp_no,
      parent_contact_no: req.body.parent_contact_no,
      parent_whatsapp_no: req.body.parent_whatsapp_no,
      address: req.body.address,
      dob: req.body.dob,
      // image: req.file.originalname,
      image: file,
      qualification: req.body.qualification,
      reference: req.body.reference,
      reference_name: req.body.reference_name,
      course: req.body.course,
      coursename: coursename,
      course_duration: req.body.course_duration,
      daily_time: req.body.daily_time,
      course_content: req.body.course_content,
      total_fees: req.body.total_fees,
      joining_date: req.body.joining_date,
      ending_date: req.body.ending_date,
      job_responsbility: req.body.job_responsbility,
      college_course: req.body.college_course,
      installment_details: installmentDetails,
      faculty: req.body.faculty,
      batch_time: req.body.batch_time,
      running_topic: req.body.running_topic,
      pc_laptop: req.body.pc_laptop,
      pc_no: req.body.pc_no,
      laptop_compulsory: req.body.laptop_compulsory,
      gst: req.body.gst,
      extra_note: req.body.extra_note,
      reception_note: req.body.reception_note,
    };
    var data = await admissionModel.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json({
      status: "Update Student_Data Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Something Wrong",
      error: error.message,
    });
  }
};

exports.deleteStudent_Detalis = async (req, res) => {
  try {
    var id = req.params.id;
    var data = await admissionModel.findByIdAndDelete(id);
    res.status(200).json({
      status: "Data Delete Successfully",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Something Wrong",
      error: error.message,
    });
  }
};

exports.allStudent_Detalis = async (req, res) => {
  try {
    var page_no = req.query.page_no;
    var limit = 5;
    var start = (page_no - 1) * limit;
    var total = await admissionModel.find().countDocuments();
    var lastpage = Math.ceil(total / limit);
    var data = await admissionModel.find().skip(start).limit(limit);
    var data1 = await admissionModel.find();

    res.status(200).json({
      status: "View All Student_Data Successfully",
      data,
      data1,
      lastpage,
      start,
    });
  } catch (error) {
    res.status(400).json({
      status: "Something Wrong",
      error: error.message,
    });
  }
};

// ================= Search Content ============================
exports.SearchStudent = async (req, res) => {
  try {
    var limit = 5;
    var page_no = req.query.page_no;
    var start = (page_no - 1) * limit;

    var search = req.query.search;
    var regex = new RegExp(search, "i");
    var total = await admissionModel
      .find({ studentname: { $regex: regex } })
      .countDocuments();
    var data = await admissionModel
      .find({ studentname: { $regex: regex } })
      .skip(start)
      .limit(limit);
    var lastpage = Math.ceil(total / limit);

    res.status(200).json({
      status: "Search Student Successfully",
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

// =================== Add Compeleted Topic ============

exports.UpdatecompleteTopic = async (req, res) => {
  try {
    var id = req.body.id;
    var data = await admissionModel.findById(id);
    if (!data.complete_topic) {
      var obj = {
        complete_topic: req.body.complete_topic,
      };
    } else {
      var obj = {
        complete_topic: data.complete_topic + "," + req.body.complete_topic,
      };
    }

    var data = await admissionModel.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json({
      status: "Update Completed Topic Successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "not Update Completed Topic",
      error: err.message,
    });
  }
};

// =================== Add Student Status ============

exports.UpdateStudentstatus = async (req, res) => {
  try {
    var id = req.body.id;
    var data = await admissionModel.findById(id);

    var obj = {
      student_status: req.body.student_status,
    };

    var data = await admissionModel.findByIdAndUpdate(id, obj, { new: true });
    res.status(200).json({
      status: "Update Student Status Successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "not Update Completed Status",
      error: err.message,
    });
  }
};
