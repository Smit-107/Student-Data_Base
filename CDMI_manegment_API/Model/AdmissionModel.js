const mongoose = require("mongoose");
const validator = require("validator");
const admissionSchema = new mongoose.Schema({
  surname: {
    type: String,
    //  required:[true,"Enter surname"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter Surname");
    //   }
    // },
  },
  studentname: {
    type: String,
    // required:[true,"Enter Studentname"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new error("Enter Studentname");
    //   }
    // },
  },
  fathername: {
    type: String,
    // required:[true,"Enter Fathername"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new error("Enter Fathername");
    //   }
    // },
  },
  stu_contact_no: {
    type: Number,
    // required: [true, 'Student phone number required'],
    // validate(value) {
    //   if (value <= 999999999) {
    //     throw new Error("Phone Number Not Valid");
    //   }
    // },
  },
  stu_whatsapp_no: {
    type: Number,
    // required: [true, 'Student phone number required'],
    // validate(value) {
    //   if (value <= 999999999) {
    //     throw new Error("Phone Number Not Valid");
    //   }
    // },
  },
  parent_contact_no: {
    type: Number,
    // required: [true, 'Parent phone number required'],
    // validate(value) {
    //   if (value <= 999999999) {
    //     throw new Error("Phone Number Not Valid");
    //   }
    // },
  },
  parent_whatsapp_no: {
    type: Number,
    // required: [true, 'Parent phone number required'],
    // validate(value) {
    //   if (value <= 999999999) {
    //     throw new Error("Phone Number Not Valid");
    //   }
    // },
  },
  address: {
    type: String,
    // required: [true, 'Student Address required'],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Student Address is Empty");
    //   }
    // },
  },
  dob: {
    type: String,
    // required:[true,"Date of Birth Required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter Date of birth");
    //   }
    // },
  },
  image: {
    type: String,
    // required:[true,"Student Image Require"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter student Image File");
    //   }
    // },
  },
  qualification: {
    type: String,
    // required:[true,"Student qualification required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter Student qualification");
    //   }
    // },
  },
  reference: {
    type: String,
    // required:[true,"Student Reference required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter reference");
    //   }
    // },
  },
  reference_name: {
    type: String,
    // required:[true,"Student Reference required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter reference");
    //   }
    // },
  },
  course: {
    type: String,
    // required:[true,"Student Course required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter Course ");
    //   }
    // },
  },
  coursename: { type: String },
  course_duration: {
    type: String,
    // required:[true,"Student course duration required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter course duration");
    //   }
    // },
  },
  daily_time: {
    type: String,
    // required:[true,"Student daily_time required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter daily_time");
    //   }
    // },
  },
  course_content: {
    type: String,
    // required:[true,"Student course_content required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter course_content");
    //   }
    // },
  },
  total_fees: {
    type: Number,
    // required: [true, "Student total_fees required"],
    // validate(value) {
    //   if (value == null) {
    //     throw new Error("Enter total_fees");
    //   }
    // },
  },
  joining_date: {
    type: String,
    // required:[true,"Student Reference required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter reference");
    //   }
    // },
  },
  ending_date: {
    type: String,
    // required:[true,"Student ending_date required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter ending_date");
    //   }
    // },
  },
  job_responsbility: {
    type: String,
    // required:[true,"Student job_responsbility required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter job_responsbility");
    //   }
    // },
  },
  college_course: {
    // required:[true,"Student college_course required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter college_course");
    //   }
    // },
  },
  
  installment_details: [
    {
        amount: {
            type: Number,
            // required: [true, "Student Fees installment Amount required"],
            // validate(value) {
            //   if (value == null) {
            //     throw new Error("Enter Fees Amount");
            //   }
            // },
        },
      installment_date: {
        type: String,
        // required: [true, "Student Fees installment Date required"],
        // validate(value) {
        //   if (validator.isEmpty(value)) {
        //     throw new Error("Enter installment Date");
        //   }
        // },
      },
      p_status: {
        type: String,
        // required: [true, "Student Fees installment Status required"],
        // validate(value) {
        //   if (validator.isEmpty(value)) {
        //     throw new Error("Enter installment Status");
        //   }
        // },
      },
    },
  ],

  faculty: {
    type: String,
    // required:[true,"Student faculty required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter faculty");
    //   }
    // },
  },
  batch_time: {
    type: String,
    // required:[true,"Student batch_time required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter batch_time");
    //   }
    // },
  },
  running_topic: {
    type: String,
    // required:[true,"Student runnng_topic required"],
    // validate(value) {
    //   if (validator.isEmpty(value)) {
    //     throw new Error("Enter runnng_topic");
    //   }
    // },
  },
  pc_laptop: { type: String, default: "pc" },
  pc_no: { type: String, default: "0" },
  laptop_compulsory: { type: String, default: "No" },

  gst: { type: String, default: "No" },
  extra_note: { type: String, default: "" },  
  reception_note: { type: String, default: "" },
  complete_topic: { type: String, default: "" },
  student_status: { type: String, default: "0" },
});

const admissionModel = mongoose.model("admission", admissionSchema);

module.exports = admissionModel;
