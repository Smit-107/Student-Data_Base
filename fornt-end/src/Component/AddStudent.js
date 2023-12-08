import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillPlusCircleFill, BsTrash } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

const AddStudent = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const init = {
    amount: "",
    installment_date: "",
    p_status: "UnPaid",
    // p_status: "0",
  };

  let [task, setTask] = useState(init);
  var [tdata, setTdata] = useState([]);

  var handleButtonClick = () => {
    if (
      task.amount !== "" &&
      task.installment_date !== "" &&
      task.p_status !== ""
    ) {
      const updatedTdata = [...tdata, task];
      setTdata(updatedTdata);
      setTask(init);
    } else {
      openModalIn();
      setTimeout(() => {
        setIsModalOpenIn(false);
        // closeModalWP()
      }, 2000);
    }
  };
  const handleDelete = (ind) => {
    const updatedData = tdata.filter((val, index) => index !== ind);
    setTdata(updatedData);
  };

  var event = (nv) => {
    let task_name = nv.target.name;
    let task_value = nv.target.value;

    setTask({ ...task, [task_name]: task_value });
  };

  const valueStudent = {
    firstname: "",
    middlename: "",
    lastname: "",
    studentcontact: "",
    studentwhatsapp: "",
    parentcontact: "",
    parentwhatsapp: "",
    address: "",
    bod: "",
    imges: '',
    qualification: "",
    selectreference: "",
    referencename: "",
    dailytime: "",
    joindate: "",
    enddate: "",
    job: 'Yes',
    faculty: "",
    batchtime: "",
    runningtopic: "",
    pc: "PC",
    pcno: "",
    laptopcompalsory: "No",
    extranote: "",
    reception: "",
  };

  let [inputStudent, setInputStudent] = useState(valueStudent);

  const input_student = (event) => {
    if (event.target.name === "imges") {
      setInputStudent({
        ...inputStudent,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setInputStudent({
        ...inputStudent,
        [event.target.name]: event.target.value,
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  const [isModalOpenWP, setIsModalOpenWP] = useState(false);
  const [isModalOpenIn, setIsModalOpenIn] = useState(false);
  const [isModalOpenSame, setIsModalOpenSame] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalW = () => {
    setIsModalOpenW(true);
  };

  const openModalWP = () => {
    setIsModalOpenWP(true);
  };

  const openModalIn = () => {
    setIsModalOpenIn(true);
  };

  const openModalSame = () => {
    setIsModalOpenSame(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalW = () => {
    setIsModalOpenW(false);
  };

  const closeModalWP = () => {
    setIsModalOpenWP(false);
  };

  const closeModalIn = () => {
    setIsModalOpenIn(false);
  };

  const closeModalSame = () => {
    setIsModalOpenSame(false);
  };

  const addStudent = () => {
    let sum = 0;

    tdata.forEach((object) => {
      sum += parseInt(object.amount);
    });
    if (
      inputStudent.imges !== "" &&
      inputStudent.selectcourse !== "" &&
      tdata !== ""
    ) {
      if (content.content_id?.total_fees === sum) {
        axios
          .post(
            "http://localhost:5000/course/newadmission",
            {
              surname: inputStudent.lastname,
              studentname: inputStudent.firstname,
              fathername: inputStudent.middlename,
              stu_contact_no: inputStudent.studentcontact,
              stu_whatsapp_no: inputStudent.studentwhatsapp,
              parent_contact_no: inputStudent.parentcontact,
              parent_whatsapp_no: inputStudent.parentwhatsapp,
              address: inputStudent.address,
              dob: inputStudent.bod,
              image: inputStudent.imges,
              qualification: inputStudent.qualification,
              reference: inputStudent.selectreference,
              reference_name: inputStudent.selectreference !== "Advertisement" ? inputStudent.referencename : inputStudent.referencename = '',
              course: inputStudent.selectcourse,
              course_duration: content.content_id?.duration || "",
              course_content: content.content_id?.content || "",
              total_fees: parseInt(content.content_id?.total_fees || 0),
              daily_time: inputStudent.dailytime,
              joining_date: inputStudent.joindate,
              ending_date: inputStudent.enddate,
              job_responsbility: inputStudent.job,
              college_course: "No",
              installment_details: JSON.stringify(tdata),
              faculty: inputStudent.faculty,
              batch_time: inputStudent.batchtime,
              running_topic: inputStudent.runningtopic,
              pc_laptop: inputStudent.pc,
              // pc_no: inputStudent.pcno,
              pc_no: inputStudent.pc !== "Laptop" ? inputStudent.pcno : inputStudent.pcno = '', 
              laptop_compulsory: inputStudent.laptopcompalsory,
              gst: "No",
              extra_note: inputStudent.extranote,
              reception_note: inputStudent.reception,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
              },
            }
          )

          .then((positive) => {
            openModal();
            setTimeout(() => {
              setIsModalOpen(false);
            }, 2000);
            setInputStudent(valueStudent);
            setTdata([]);
            setContent("");
            handleTabClick("tab1")
          })
          .catch((err) => {
            if (err.response.status === 400) {
              openModalW();
              setTimeout(() => {
                setIsModalOpenW(false);
              }, 2000);
            } else {
              alert(err);
            }
          });
      } else {
        openModalSame();
        setTimeout(() => {
          setIsModalOpenSame(false);
        }, 2000);
      }
    } else {
      openModalWP();
      setTimeout(() => {
        setIsModalOpenWP(false);
      }, 2000);
    }
  };

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/course/allcourse", {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        const data = response.data.data1;
        setCourses(data);
      })
      .catch(function (error) {
        alert(error);
      });
  }, [token]);

  const handlegetData = (event) => {
    axios
      .get(`http://localhost:5000/course/viewsinglecourse/${event}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        const data = response.data.data;
        setContent(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="bg-gray-100 addstudent">
        <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
          <h2 className="sm:w-1/2 text-name sm:px-3 px-1 text-gray-800 text-2xl font-bold">
            New Admission
          </h2>
          <div className="sm:w-1/2 text-name-all sm:px-3 px-1 text-end text text-gray-500">
            <span className="text-blue-600">Home</span> /<span> Admission</span>
            <span>/</span>
            <span> Add Student</span>
          </div>
        </div>
        <div className="lg:px-12 md:px-8 sm:p-4 p-3">
          <div
            className="bg-white p-4 form-height rounded-xl  overflow-auto custom-scrollbar"
            style={{ boxShadow: "0px 0px 20px #D9D9DB" }}
          >
            <div className="text-center pt-2  flex flex-col justify-center sm:flex-row border-b text-sm border-indigo-600">
              <span
                style={{ marginBottom: "-1px" }}
                className={`cursor-pointer -m-0.5 w-auto ${
                  activeTab === "tab1"
                    ? "border-2  rounded-t-2xl font-bold border-indigo-600 text-indigo-600 border-b-white"
                    : ""
                } mx-2 px-3 sm:pb-3 pb-1 pt-2`}
                onClick={() => handleTabClick("tab1")}
              >
                Student Information
              </span>
              <span
                style={{ marginBottom: "-1px" }}
                className={`cursor-pointer -m-0.5 w-auto ${
                  activeTab === "tab2"
                    ? "border-2  rounded-t-2xl font-bold border-indigo-600 text-indigo-600 border-b-white"
                    : ""
                } mx-2 px-3 sm:pb-3 pb-1 pt-2`}
                onClick={() => handleTabClick("tab2")}
              >
                Course Information
              </span>
              <span
                style={{ marginBottom: "-1px" }}
                className={`cursor-pointer -m-0.5 w-auto ${
                  activeTab === "tab3"
                    ? "border-2  rounded-t-2xl font-bold border-indigo-600 text-indigo-600 border-b-white"
                    : ""
                } mx-2 px-3 sm:pb-3 pb-1 pt-2`}
                onClick={() => handleTabClick("tab3")}
              >
                Faculty Information
              </span>
            </div>

            <form action="">
              {activeTab === "tab1" && (
                <div className="flex flex-col mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="firstname"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        {" "}
                        First Name
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.firstname}
                        autoComplete="given-name"
                        name="firstname"
                        id="firstname"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="First Name ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="middlename"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        {" "}
                        Middel Name
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.middlename}
                        name="middlename"
                        id="middlename"
                        autoComplete="given-name"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Middel Name ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="lastname"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        {" "}
                        Last Name
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.lastname}
                        name="lastname"
                        id="lastname"
                        autoComplete="given-name"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Last Name ..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="studentcontact"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Student Contact No.
                      </label>
                      <input
                        type="number"
                        onChange={input_student}
                        value={inputStudent.studentcontact}
                        autoComplete="given-name"
                        maxLength={10}
                        id="studentcontact"
                        name="studentcontact"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Contact No ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="studentwhatsapp"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Student No.
                      </label>
                      <input
                        type="number"
                        onChange={input_student}
                        value={inputStudent.studentwhatsapp}
                        autoComplete="given-name"
                        maxLength={10}
                        id="studentwhatsapp"
                        name="studentwhatsapp"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Whatsapp No ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="parentcontact"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Parent Contact No.
                      </label>
                      <input
                        type="number"
                        onChange={input_student}
                        value={inputStudent.parentcontact}
                        autoComplete="given-name"
                        maxLength={10}
                        id="parentcontact"
                        name="parentcontact"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Contact No ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="parentwhatsapp"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Parent No.
                      </label>
                      <input
                        type="number"
                        onChange={input_student}
                        value={inputStudent.parentwhatsapp}
                        autoComplete="given-name"
                        maxLength={10}
                        id="parentwhatsapp"
                        name="parentwhatsapp"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Whatsapp No ..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="address"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Address
                      </label>
                      <textarea
                        name="address"
                        onChange={input_student}
                        value={inputStudent.address}
                        autoComplete="given-name"
                        id="address"
                        cols="2"
                        rows="2"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Address ..."
                      ></textarea>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="bod"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        {" "}
                        Birth of Date
                      </label>
                      <input
                        type="date"
                        onChange={input_student}
                        value={inputStudent.bod}
                        autoComplete="given-name"
                        id="bod"
                        name="bod"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Middel Name ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="file"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        className="border text-gray-400 rounded-md px-3 py-1.5 w-full "
                        autoComplete="given-name"
                        onChange={input_student}
                        name="imges"
                        id="file"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="qualification"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Qualification
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.qualification}
                        id="qualification"
                        autoComplete="given-name"
                        name="qualification"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Qualification ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="selectreference"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Select Reference
                      </label>
                      <select
                        name="selectreference"
                        onChange={input_student}
                        value={inputStudent.selectreference}
                        id="selectreference"
                        autoComplete="given-name"
                        className="border rounded-md px-3 py-1.5 w-full "
                      >
                        <option className="text-gray-400" value={""} disabled>
                          Select Reference ...
                        </option>
                        <option value="Our Student">Our Student</option>
                        <option value="Advertisement">Advertisement</option>
                      </select>
                    </div>

                    {inputStudent.selectreference !== 'Advertisement' &&
                      <div className="p-2">
                      <label
                        htmlFor="referencename"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Reference Name
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.referencename}
                        id="referencename"
                        autoComplete="given-name"
                        name="referencename"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Reference Name ..."
                      />
                    </div>
                    }
                  </div>
                </div>
              )}

              {activeTab === "tab2" && (
                <div className="flex flex-col mt-5 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="course"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Course
                      </label>
                      <select
                        name="selectcourse"
                        onChange={(e) => {
                          input_student(e);
                          handlegetData(e.target.value);
                        }}
                        value={inputStudent.selectcourse || ""}
                        id="course"
                        className="border rounded-md px-3 py-1.5 w-full "
                      >
                        {/* <option className="text-gray-400" disabled value={''}>
                          Select Course...
                        </option> */}
                        <option className="text-gray-400" value={""} disabled>
                          Select Course...
                        </option>

                        {courses.map((val, ind) => {
                          return (
                            <option
                              key={ind}
                              className="capitalize"
                              value={val._id}
                            >
                              {val.coursename}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="courseduration"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Course Duration
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={content.content_id?.duration || ""}
                        id="courseduration"
                        name="courseduration"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Course Duration ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="dailytime"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Daily Time
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.dailytime}
                        id="dailytime"
                        name="dailytime"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Time ..."
                      />
                    </div>
                  </div>

                  <div className="p-2">
                    <label
                      htmlFor="coursecontents"
                      className="block font-semibold mb-1 text-gray-600 text-sm"
                    >
                      Course Contents
                    </label>
                    <textarea
                      name="coursecontents"
                      onChange={input_student}
                      value={content.content_id?.content || ""}
                      id="coursecontents"
                      className="border rounded-md px-3 py-1.5 w-full"
                      rows="2"
                      placeholder="Enter Course Contents ..."
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="totalfees"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Total Fees
                      </label>
                      <input
                        id="totalfees"
                        onChange={input_student}
                        value={content.content_id?.total_fees || ""}
                        type="number"
                        maxLength={10}
                        name="totalfees"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Fees ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="joindate"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Joining Date
                      </label>
                      <input
                        id="joindate"
                        onChange={input_student}
                        value={inputStudent.joindate}
                        type="date"
                        name="joindate"
                        className="border rounded-md px-3 py-1.5 w-full"
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="enddate"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Ending Date
                      </label>
                      <input
                        id="enddate"
                        onChange={input_student}
                        value={inputStudent.enddate}
                        type="date"
                        name="enddate"
                        className="border rounded-md px-3 py-1.5 w-full"
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="job"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Job Responsibility
                      </label>
                      <div className="border rounded-md px-3 py-1.5 w-full flex flex-row">
                          <input
                            id="yess"
                            type="radio"
                            onChange={input_student}
                            value={"Yes"}
                            // checked={inputStudent.job === "Yes"}
                            checked={ inputStudent.job === "Yes"}
                            className="me-2"
                            name="job"
                          />
                        <span className="text-gray-500 me-4">Yes</span>
                        <input
                          id="job"
                          type="radio"
                          onChange={input_student}
                          value={"No"}
                          // checked={inputStudent.job === "No"}
                          checked={inputStudent.job === "No"} 
                          className="me-2"
                          name="job"
                        />
                        <span className="text-gray-500 ">No</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <td colSpan={3}>
                            <div className="p-2">
                              <label
                                htmlFor="installmentdetails"
                                className="block font-semibold mb-1 text-gray-600 text-sm"
                              >
                                Installment Details
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 w-2/5">
                            <input
                              type="text"
                              id="installmentdetails"
                              name="amount"
                              value={task.amount}
                              onChange={event}
                              className="border rounded-md px-3 py-1.5 w-full"
                              placeholder="Enter Installment Amount ..."
                            />
                          </td>
                          <td className="p-2 w-2/5">
                            <input
                              type="date"
                              id="installmentdetails"
                              name="installment_date"
                              placeholder="Select a date ..."
                              value={task.installment_date}
                              onChange={event}
                              className="custom-date-input custom-date-input border rounded-md px-3 py-1.5 w-full "
                            />
                          </td>
                          <td className="p-2 w-1/5">
                            <div
                              onClick={handleButtonClick}
                              className="border  border-indigo-600 w-1/3 rounded-md flex  justify-center items-center py-2.5 sm:px-2 px-1 bg-indigo-600 hover:bg-indigo-700 text-white "
                            >
                              <BsFillPlusCircleFill className="" />
                            </div>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {tdata.map((data, id) => {
                          return (
                            <tr key={id}>
                              <td className="p-2 w-2/5">
                                <input
                                  type="text"
                                  id={`installment${id}`}
                                  readOnly
                                  className="border rounded-md px-3 py-1.5 w-full"
                                  value={data.amount}
                                  placeholder="Enter Installment Amount ..."
                                />
                              </td>
                              <td className="p-2 w-2/5">
                                <input
                                  type="date"
                                  id={`ddd${id}`}
                                  readOnly
                                  value={data.installment_date}
                                  className="border rounded-md px-3 py-1.5 w-full "
                                />
                              </td>
                              <td className="p-2 w-1/5">
                                <div
                                  onClick={() => handleDelete(id)}
                                  readOnly
                                  className="border  border-red-600 w-1/3 rounded-md flex  justify-center items-center py-2.5 sm:px-2 px-1  bg-red-600 hover:bg-red-700 text-white "
                                >
                                  <BsTrash className="ms-0.5" />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "tab3" && (
                <div className="flex flex-col mt-5 ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="faculty"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Select Faculty
                      </label>
                      <select
                        name="faculty"
                        onChange={input_student}
                        value={inputStudent.faculty}
                        id="faculty"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Select Faculty ..."
                      >
                        <option className="text-gray-400" value={""} disabled>
                          Select Faculty ...
                        </option>
                        <option value="Any One"> Any One </option>
                      </select>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="batchtime"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Batch time
                      </label>
                      <select
                        name="batchtime"
                        onChange={input_student}
                        value={inputStudent.batchtime}
                        id="batchtime"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Select Batch Time ..."
                      >
                        <option className="text-gray-400" value={""} disabled>
                          Select Batch Time ...
                        </option>
                        <option value="8:00 to 10:00 A.M.">
                          8:00 to 10:00 A.M.
                        </option>
                        <option value="10:00 to 12:00 A.M.">
                          10:00 to 12:00 A.M.
                        </option>
                        <option value="12:00 to 2:00 P.M.">
                          12:00 to 2:00 P.M.
                        </option>
                        <option value="2:00 to 4:00 P.M.">
                          2:00 to 4:00 P.M.
                        </option>
                        <option value="4:00 to 6:00 P.M.">
                          4:00 to 6:00 P.M.
                        </option>
                        <option value="6:00 to 8:00 P.M.">
                          6:00 to 8:00 P.M.
                        </option>
                      </select>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="runningtopic"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Running Topic
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.runningtopic}
                        id="runningtopic"
                        name="runningtopic"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Enter Running ..."
                      />
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="pc"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        PC / Laptop
                      </label>
                      <div className="border rounded-md px-3 py-1.5 w-full flex flex-row">
                        <input
                          id="yess"
                          type="radio"
                          onChange={input_student}
                          value={"PC"}
                          checked={inputStudent.pc === "PC"}
                          className="me-2"
                          name="pc"
                        />
                        <span className="text-gray-500 me-4">Pc</span>
                        <input
                          id="pc"
                          type="radio"
                          onChange={input_student}
                          value={"Laptop"}
                          checked={inputStudent.pc === "Laptop"}
                          className="me-2"
                          name="pc"
                        />
                        <span className="text-gray-500 ">Laptop</span>
                      </div>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="pcno"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        PC No.
                      </label>
                      <input
                        type="text"
                        onChange={input_student}
                        value={inputStudent.pcno}
                        id="pcno"
                        name="pcno"
                        className="border rounded-md px-3 py-1.5 w-full"
                        placeholder="Select PC No ..."
                      />
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="laptopcompalsory"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Laptop Compalsory
                      </label>
                      <div className="border rounded-md px-3 py-1.5 w-full flex flex-row">
                        <input
                          id="noo"
                          type="radio"
                          onChange={input_student}
                          value={"Yes"}
                          checked={inputStudent.laptopcompalsory === "Yes"}
                          className="me-2"
                          name="laptopcompalsory"
                        />
                        <span className="text-gray-500 me-4">Yes</span>
                        <input
                          id="laptopcompalsory"
                          onChange={input_student}
                          value={"No"}
                          checked={inputStudent.laptopcompalsory === "No"}
                          type="radio"
                          className="me-2"
                          name="laptopcompalsory"
                        />
                        <span className="text-gray-500 ">No</span>
                      </div>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="p-2">
                      <label
                        htmlFor="laptopcompalsory"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        Laptop Compalsory
                      </label>
                      <div className="border rounded-md px-3 py-1.5 w-full flex flex-row">
                        <input
                          id="noo"
                          type="radio"
                          onChange={input_student}
                          value={"Yes"}
                          checked={inputStudent.laptopcompalsory === "Yes"}
                          className="me-2"
                          name="laptopcompalsory"
                        />
                        <span className="text-gray-500 me-4">Yes</span>
                        <input
                          id="laptopcompalsory"
                          onChange={input_student}
                          value={"No"}
                          checked={inputStudent.laptopcompalsory === "No"}
                          type="radio"
                          className="me-2"
                          name="laptopcompalsory"
                        />
                        <span className="text-gray-500 ">No</span>
                      </div>
                    </div>

                    <div className="p-2">
                      <label
                        htmlFor="pc"
                        className="block font-semibold mb-1 text-gray-600 text-sm"
                      >
                        PC / Laptop
                      </label>
                      <div className="border rounded-md px-3 py-1.5 w-full flex flex-row">
                        <input
                          id="yess"
                          type="radio"
                          onChange={input_student}
                          value={"PC"}
                          checked={inputStudent.pc === "PC"}
                          className="me-2"
                          name="pc"
                        />
                        <span className="text-gray-500 me-4">Pc</span>
                        <input
                          id="pc"
                          type="radio"
                          onChange={input_student}
                          value={"Laptop"}
                          checked={inputStudent.pc === "Laptop"}
                          className="me-2"
                          name="pc"
                        />
                        <span className="text-gray-500 ">Laptop</span>
                      </div>
                    </div>

                    {inputStudent.pc !== "Laptop" && (
                      <div className="p-2">
                        <label
                          htmlFor="pcno"
                          className="block font-semibold mb-1 text-gray-600 text-sm"
                        >
                          PC No.
                        </label>
                        <input
                          type="text"
                          onChange={input_student}
                          value={inputStudent.pcno}
                          id="pcno"
                          name="pcno"
                          className="border rounded-md px-3 py-1.5 w-full"
                          placeholder="Select PC No ..."
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-2">
                    <label
                      htmlFor="extranote"
                      className="block font-semibold mb-1 text-gray-600 text-sm"
                    >
                      Extra Note
                    </label>
                    <textarea
                      name="extranote"
                      onChange={input_student}
                      value={inputStudent.extranote}
                      id="extranote"
                      className="border rounded-md px-3 py-1.5 w-full"
                      rows="2"
                    ></textarea>
                  </div>

                  <div className="p-2 ">
                    <label
                      htmlFor="reception"
                      className="block font-semibold mb-1 text-gray-600 text-sm"
                    >
                      Reception Note
                    </label>
                    <textarea
                      name="reception"
                      onChange={input_student}
                      value={inputStudent.reception}
                      id="reception"
                      className="border rounded-md px-3 py-1.5 w-full focus:border-indigo-600"
                      rows="2"
                    ></textarea>
                  </div>

                  <div className="text-center mt-2">
                    <input
                      type="button"
                      id="submit"
                      value={"Submit"}
                      onClick={addStudent}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-3 py-1.5"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={`modal active`}>
          <div className="modal-content">
            <div className=" bg-green-200 text-green-800 border-b-4 border-green-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 flex items-center text-green-600">
                    <img src={require("../images/sucessful.gif")} alt="" />
                  </div>
                  <div className="ms-5">
                    <p className="font-bold">Success</p>
                    <p>Student Add successfully...</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenW && (
        <div className="modal active">
          <div className="modal-content">
            <div className=" bg-red-200 text-red-800 border-b-4 border-red-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0  flex items-center text-red-600">
                    <CgDanger className="w-7 h-7" />
                  </div>
                  <div className="ms-3">
                    <p className="font-bold">Warning</p>
                    <p>Student Not Add ....!</p>
                  </div>
                </div>
                <button
                  onClick={closeModalW}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenWP && (
        <div className="modal active">
          <div className="modal-content">
            <div className=" bg-yellow-200 text-yellow-800 border-b-4 border-yellow-600 px-4 py-2 ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0  flex items-center text-yellow-600">
                    <CgDanger className="w-7 h-7" />
                  </div>
                  <div className="ms-3">
                    <p className="font-bold">Warning</p>
                    <p>
                      Edit some information like image,course and installment
                      details ...!
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModalWP}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenIn && (
        <div className={`modal active`}>
          <div className="modal-content">
            <div className=" bg-red-200 text-red-800 border-b-4 border-red-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0  flex items-center text-red-600">
                    <CgDanger className="w-7 h-7" />
                  </div>
                  <div className="ms-5">
                    <p className="font-bold">Danger</p>
                    <p>Add installment details ...!</p>
                  </div>
                </div>
                <button
                  onClick={closeModalIn}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpenSame && (
        <div className={`modal active`}>
          <div className="modal-content">
            <div className=" bg-red-200 text-red-800 border-b-4 border-red-600 p-4  ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0  flex items-center text-red-600">
                    <CgDanger className="w-7 h-7" />
                  </div>
                  <div className="ms-5">
                    <p className="font-bold">Danger</p>
                    <p> Installment amount and Total fees is not same ...!</p>
                  </div>
                </div>
                <button
                  onClick={closeModalSame}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M21.293 2.293a1 1 0 010 1.414L3.707 22.707a1 1 0 01-1.414-1.414L19.293 1.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M1.293 1.293a1 1 0 011.414 0L22.707 19.293a1 1 0 010 1.414L19.293 22.707a1 1 0 01-1.414-1.414L1.293 2.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
