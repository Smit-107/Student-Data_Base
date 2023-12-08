import React from "react";
import { BsTrash, BsPencilSquare, BsFillPlusCircleFill } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";
import { GiTireIronCross } from "react-icons/gi";

const ViewStudent = () => {
  const token = localStorage.getItem("token");
  const [demo, setDemo] = useState([]);
  // const [demo11, setDemo11] = useState(false);

  

  // const demo1 = () => {
  //   setDemo11(true);
  // }

  const viewData = () => {
    axios
      .get(`http://localhost:5000/course/allstudent_detail`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        setDemo(response.data.data1);
        console.log(response.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    viewData()
  },[]);    // here i remove the dependency array

  const handleDelete = (s_id) => {
    axios
      .delete(`http://localhost:5000/course/deletestudentDetail/${s_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        viewData();
        openModalWW();
        setTimeout(() => {
          setIsModalOpenWW(false);
        }, 2000);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWW, setIsModalOpenWW] = useState(false);
  var [viewCourceT, setViewCourceT] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalWW = () => {
    setIsModalOpenWW(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const closeModalWW = () => {
  //   setIsModalOpenWW(false);
  // };

  const [activeTab, setActiveTab] = useState("tab1");
  const [content, setContent] = useState("");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const init = {
    amount: "",
    installment_date: "",
    p_status:"",
  };

  let [task, setTask] = useState(init);
  var [tdata, setTdata] = useState([]);

  var handleButtonClick = () => {
    if (
      task.amount !== "" &&
      task.installment_date !== "" 
      // task.p_status !== ""
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
  // console.log(tdata);

  const handleDeleteI = (ind) => {
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
    pw: "",
    address: "",
    bod: "",
    imges: "",
    qualification: "",
    selectreference: "",
    referencename: "",
    dailytime: "",
    joindate: "",
    enddate: "",
    job: "",
    faculty: "",
    batchtime: "",
    runningtopic: "",
    pc: "",
    pcno: "",
    laptopcompalsory: "",
    extranote: "",
    reception: "",
    selectcourse: "",
    course_content: " ",
    course_duration: "",
    total_fees: "",
  };

  let [inputStudent, setInputStudent] = useState(valueStudent);
  // let [inputStudent, setInputStudent] = useState([]);

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

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  const [isModalOpenWP, setIsModalOpenWP] = useState(false);
  const [isModalOpenIn, setIsModalOpenIn] = useState(false);
  const [isModalOpenSame, setIsModalOpenSame] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

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

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

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
    console.log("sum", sum);
    // console.log("img", inputStudent.imges);
    content === ""
      ? console.log(inputStudent.total_fees === sum)
      : console.log(content.content_id.total_fees === sum);
    console.log("tdata", tdata);

    if (
      inputStudent.imges !== "" &&
      inputStudent.selectcourse !== "" &&
      tdata !== ""
    ) {
      if (
        // content.content_id?.total_fees === sum ||
        // inputStudent.total_fees === sum
        content === ""
          ? inputStudent.total_fees === sum
          : content.content_id.total_fees === sum
      ) {
        axios
          .put(
            `http://localhost:5000/course/updatestudentDetail/${id}`,
            {
              surname: inputStudent.lastname,
              studentname: inputStudent.firstname,
              fathername: inputStudent.middlename,
              stu_contact_no: inputStudent.studentcontact,
              stu_whatsapp_no: inputStudent.studentwhatsapp,
              parent_contact_no: inputStudent.parentcontact,
              parent_whatsapp_no: inputStudent.pw,
              address: inputStudent.address,
              dob: inputStudent.bod,
              image: inputStudent.imges,
              qualification: inputStudent.qualification,
              reference: inputStudent.selectreference,
              reference_name: inputStudent.referencename,
              course: inputStudent.selectcourse,
              course_duration:
                content !== ""
                  ? content.content_id.duration
                  : inputStudent.course_duration,
              // content.content_id?.duration || inputStudent.course_duration,
              course_content:
                content !== ""
                  ? content.content_id.content
                  : inputStudent.course_content,
              // content.content_id?.content || inputStudent.course_content,
              total_fees: parseInt(
                content !== ""
                  ? content.content_id.total_fees
                  : inputStudent.total_fees
              ),
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
              pc_no:
                inputStudent.pc !== "Laptop"
                  ? inputStudent.pcno
                  : (inputStudent.pcno = ""),
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
            console.log(positive);
            setContent("");
            setTdata([]);
            setInputStudent(valueStudent);
            setViewCourceT(false);
            openModal();
            setTimeout(() => {
              setIsModalOpen(false);
            }, 2000);
            handleTabClick("tab1");
            viewData();
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
  const [remaining_fees, setRemaining_fees] = useState('');
  const [id, setId] = useState("");

  const openedit = (id) => {
    setId(id);
    setViewCourceT(true);
    // setContentFocused(true);
    axios
      .get(`http://localhost:5000/course/viewstudentDetail/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        const data = response.data.data;

        const installmentDetails = data.installment_details || [];
        let totalPaidAmount = 0;

        installmentDetails.forEach(installment => {
          if (installment.p_status === 'Paid') {
            totalPaidAmount += installment.amount;
          }
        });

        const remainingFees = data.total_fees - totalPaidAmount;
        setRemaining_fees(remainingFees);


        inputStudent.firstname = data.studentname;
        inputStudent.middlename = data.fathername;
        inputStudent.lastname = data.surname;
        inputStudent.studentcontact = data.stu_contact_no;
        inputStudent.studentwhatsapp = data.stu_whatsapp_no;
        inputStudent.parentcontact = data.parent_contact_no;
        inputStudent.pw = data.parent_whatsapp_no;
        inputStudent.address = data.address;
        inputStudent.bod = data.dob;
        inputStudent.imges = data.image;
        inputStudent.qualification = data.qualification;
        inputStudent.selectreference = data.reference;
        inputStudent.referencename = data.reference_name;
        inputStudent.dailytime = data.daily_time;
        inputStudent.joindate = data.joining_date;
        inputStudent.enddate = data.ending_date;
        inputStudent.job = data.job_responsbility;
        inputStudent.faculty = data.faculty;
        inputStudent.batchtime = data.batch_time;
        inputStudent.runningtopic = data.running_topic;
        inputStudent.pc = data.pc_laptop;
        inputStudent.pcno = data.pc_no;
        inputStudent.laptopcompalsory = data.laptop_compulsory;
        inputStudent.extranote = data.extra_note;
        inputStudent.reception = data.reception_note;
        inputStudent.selectcourse = data.course;
        inputStudent.course_content = data.course_content;
        inputStudent.course_duration = data.course_duration;
        inputStudent.total_fees = data.total_fees;
        setTdata(data.installment_details);
        console.log(data.image);
      })
      .catch(function (error) {
        console.log(error);
      });

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
  };
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

  function handleStatusChange(id, newStatus) {
    const updatedTdata = [...tdata];
    updatedTdata[id].p_status = newStatus;
    if(updatedTdata[id].p_status === 'Paid'){
      setRemaining_fees(remaining_fees - parseInt(updatedTdata[id].amount))
    }
    else{
      setRemaining_fees(remaining_fees + parseInt(updatedTdata[id].amount))
    }
    setTdata(updatedTdata);
    console.log("remaining_fees",remaining_fees);
    console.log("updatedTdata",updatedTdata);
  }

  return (
    <div>
      <div>
        {
          // demo11 &&
          <div className="bg-gray-100 ">
            <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
              <h2 className="sm:w-1/2 text-name sm:px-3 px-1 text-gray-800 text-2xl font-bold">
                View Student
              </h2>
              <div className="sm:w-1/2 sm:px-3  text-name-all px-1 text-end text text-gray-500">
                <span className="text-blue-600">Home</span> /
                <span> Admission</span> <span>/</span>
                <span> View Student</span>
              </div>
            </div>
            <div className="sm:p-4 p-3">
              <div
                style={{ boxShadow: "0px 0px 20px #D9D9DB" }}
                className="form-height overflow-auto custom-scrollbar rounded-xl"
              >
                <div className="">
                  <table className="w-full bg-white border border-gray-200  ">
                    <thead className="mt-1 uppercase text-sm leading-normal w-full ">
                      <tr className="sticky top-0  bg-gray-100 text-gray-600 border-b border-black">
                        <th className="py-3 px-6 border-y text-left">no.</th>
                        <th className="py-3 px-6 border-y text-left">
                          Student Name
                        </th>
                        <th className="py-3 px-6 border-y text-left">
                          Student Contact
                        </th>
                        {/* <th className='py-3 px-6 border-y text-left'>Parent Contact</th> */}
                        {/* <th className='py-3 px-6 border-y text-left'>Qualification</th> */}
                        <th className="py-3 px-6 border-y text-left">
                          Course Name
                        </th>
                        {/* <th className="py-3 px-6 border-y text-left w-1/12">
                        Course Contents
                      </th> */}
                        {/* <th className="py-3 px-6 border-y text-left">
                        Course Duration
                      </th> */}
                        <th className="py-3 px-6 border-y text-left">
                          Total Fees
                        </th>
                        {/* <th className="py-3 px-6 border-y text-left">
                        Joining Date
                      </th> */}
                        {/* <th className='py-3 px-6 border-y text-left'>Ending Date</th> */}
                        {/* <th className="py-3 px-6 border-y text-left">Job </th> */}
                        {/* <th className='py-3 px-6 border-y text-left'>Job Responsibility</th> */}
                        {/* <th className='py-3 px-6 border-y text-left'>Faculty</th> */}
                        <th className="py-3 px-6 border-y text-left">
                          Batch Time{" "}
                        </th>
                        {/* <th className="py-3 px-6 border-y text-left">
                        Running Topic
                      </th> */}
                        <th className="py-3 px-6 border-y text-left">
                          PC / Laptop
                        </th>
                        {/* <th className='py-3 px-6 border-y text-left'>Reception Note</th> */}
                        <th className="py-3 px-6 border-y text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-900 text-sm font-light text">
                      {demo.map((val, id) => {
                        return (
                          <tr
                            key={id}
                            className="border-b border-gray-200 hover:text-black hover:bg-gray-100 w-full"
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {id + 1}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.studentname} {val.surname}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.stu_contact_no}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.coursename}
                            </td>
                            {/* <td className="py-3 px-6 text-left w-1/12">
                            {val.course_content}
                          </td> */}
                            {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                            {val.course_duration}
                          </td> */}
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.total_fees}
                            </td>
                            {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                            {val.joining_date}
                          </td> */}
                            {/* <td className='py-3 px-6 text-left whitespace-nowrap'>{val.ending_date}</td> */}
                            {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                            {val.job_responsbility}
                          </td> */}
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.batch_time}
                            </td>
                            {/* <td className="py-3 px-6 text-left whitespace-nowrap">
                            {val.running_topic}
                          </td> */}
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {val.pc_laptop}
                            </td>
                            {/* <td className='py-3 px-6 text-left whitespace-nowrap'>{val.reception_note}</td> */}
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <span className="flex">
                                {/* <Link to={`/editstudent/${val._id}`}> */}
                                <BsPencilSquare
                                  onClick={() => {
                                    openedit(val._id);
                                  }}
                                  className="text-blue-500 font-bold hover:text-blue-700 me-3 cursor-pointer"
                                />
                                {/* </Link> */}
                                <BsTrash
                                  onClick={() => {
                                    handleDelete(val._id);
                                  }}
                                  className="text-red-500 font-bold hover:text-red-700 me-3 cursor-pointer"
                                />
                                <Link to={`/viewstudent/${val._id}`}>
                                  <FaRegEye className="text-green-600 font-bold hover:text-green-800 cursor-pointer" />
                                </Link>
                                {/* <FaRegEye onClick={demo1} className="text-green-600 font-bold hover:text-green-800 cursor-pointer" /> */}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }

        {viewCourceT && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-full overflow-y-auto">
              <div className="flex h-screen items-end justify-center px-4 py-2 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full lg:max-w-4xl md:max-w-2xl max-w-xl">
                  <div className="bg-gray-100 px-4 py-4 sm:p-6 sm:pb-4 sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:items-center ">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-indigo-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-lg font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Edit Student Details
                        </h3>
                      </div>
                    </div>

                    <div
                      className="m-auto sm:m-0 w-8 hover:cursor-pointer hover:bg-gray-300 duration-300 p-2 rounded-full font-bold sm:mt-0"
                      onClick={() => {
                        setViewCourceT(false);
                        handleTabClick("tab1");
                        setContent("");
                        setTask(init)
                      }}
                    >
                      <GiTireIronCross className="font-bold" />
                    </div>
                  </div>
                  <div>
                    <div className="bg-gray-100 addstudent">
                      <div className="lg:px-12 md:px-8 sm:pb-4 pb-3">
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

                          {activeTab === "tab1" && (
                            <div className="flex flex-col mt-5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                                <div className="p-2">
                                  <label
                                    htmlFor="firstname"
                                    className="block font-semibold mb-1 text-gray-600 text-sm"
                                  >
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
                                    value={inputStudent.studentcontact || ""}
                                    name="studentcontact"
                                    id="studentcontact"
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
                                    value={inputStudent.studentwhatsapp || ""}
                                    name="studentwhatsapp"
                                    id="studentwhatsapp"
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
                                    value={inputStudent.parentcontact || ""}
                                    name="parentcontact"
                                    id="parentcontact"
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
                                    value={inputStudent.pw || ""}
                                    name="pw"
                                    id="parentwhatsapp"
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
                                    <option
                                      className="text-gray-400"
                                      value={""}
                                      disabled
                                    >
                                      Select Reference ...
                                    </option>
                                    <option value="Our Student">
                                      Our Student
                                    </option>
                                    <option value="Advertisement">
                                      Advertisement
                                    </option>
                                  </select>
                                </div>

                                {inputStudent.selectreference !==
                                  "Advertisement" && (
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
                                )}
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
                                    <option
                                      className="text-gray-400"
                                      value={""}
                                      disabled
                                    >
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
                                    value={
                                      content.content_id?.duration ||
                                      inputStudent.course_duration
                                    }
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

                              <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-2">
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
                                  value={
                                    content.content_id?.content ||
                                    inputStudent.course_content
                                  }
                                  id="coursecontents"
                                  className="border rounded-md px-3 py-1.5 w-full"
                                  rows="2"
                                  placeholder="Enter Course Contents ..."
                                ></textarea>
                                </div>
                                <div className="p-2">
                                  <label
                                    htmlFor="dailytime"
                                    className="block font-semibold mb-1 text-gray-600 text-sm"
                                  >
                                    Remaining Fees
                                  </label>
                                  <input
                                    type="text"
                                    onChange={input_student}
                                    readOnly
                                    value={remaining_fees}
                                    id="Remaining Fees"
                                    name="Remaining_Fees"
                                    className="border rounded-md px-3 py-1.5 w-full"
                                    placeholder="Remaining Fees ..."
                                  />
                                </div>
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
                                    value={
                                      content.content_id?.total_fees ||
                                      inputStudent.total_fees
                                    }
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
                                      checked={inputStudent.job === "Yes"}
                                      className="me-2"
                                      name="job"
                                    />
                                    <span className="text-gray-500 me-4">
                                      Yes
                                    </span>
                                    <input
                                      id="job"
                                      type="radio"
                                      onChange={input_student}
                                      value={"No"}
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


                                          {/* <td className="p-2 w-1/5">
                                            <div
                                              onClick={() => handleDeleteI(id)}
                                              readOnly
                                              className="border  border-red-600 w-1/3 rounded-md flex  justify-center items-center py-2.5 sm:px-2 px-1  bg-red-600 hover:bg-red-700 text-white ">
                                              <BsTrash className="" />
                                            </div>
                                          </td> */}



                                          <td className="p-2 w-1/5 ">
                                            <div className="flex">
                                              <div className="me-2">
                                                <select
                                                  name="p_status"
                                                  id={`p_status${id}`}
                                                  className="border rounded-md pe-3 ps-1 py-1.5 w-full"
                                                  placeholder="Select Status ..."
                                                  onChange={(e) => handleStatusChange(id, e.target.value)}
                                                  value={data.p_status}
                                                >
                                                  <option
                                                    className="text-gray-400"
                                                    value={""}
                                                    disabled
                                                  >
                                                    Select Status ...
                                                  </option>
                                                  <option value="Paid">
                                                    Paid
                                                  </option>
                                                  <option value="UnPaid">
                                                    UnPaid
                                                  </option>
                                                </select>
                                              </div>
                                              <div
                                                onClick={() =>
                                                  handleDeleteI(id)
                                                }
                                                readOnly
                                                className="border  border-red-600  rounded-md flex  justify-center items-center py-2.5 sm:px-2 px-1  bg-red-600 hover:bg-red-700 text-white "
                                              >
                                                <BsTrash className="" />
                                              </div>
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
                                    <option
                                      className="text-gray-400"
                                      value={""}
                                      disabled
                                    >
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
                                    <option
                                      className="text-gray-400"
                                      value={""}
                                      disabled
                                    >
                                      Select Batch Time ...
                                    </option>
                                    <option value="8:00 to 9:00 A.M.">
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
                                      checked={
                                        inputStudent.laptopcompalsory === "Yes"
                                      }
                                      className="me-2"
                                      name="laptopcompalsory"
                                    />
                                    <span className="text-gray-500 me-4">
                                      Yes
                                    </span>
                                    <input
                                      id="laptopcompalsory"
                                      onChange={input_student}
                                      value={"No"}
                                      checked={
                                        inputStudent.laptopcompalsory === "No"
                                      }
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
                                    <span className="text-gray-500 me-4">
                                      Pc
                                    </span>
                                    <input
                                      id="pc"
                                      type="radio"
                                      onChange={input_student}
                                      value={"Laptop"}
                                      checked={inputStudent.pc === "Laptop"}
                                      className="me-2"
                                      name="pc"
                                    />
                                    <span className="text-gray-500 ">
                                      Laptop
                                    </span>
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
                        </div>
                      </div>
                    </div>

                    {/* student not add..... */}
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
                                  <p>Student Not Edit ....!</p>
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
                    {/* information need ..... */}
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
                                    Edit some information like image,course and
                                    installment details ...!
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
                    {/* with out information ..... */}

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
                    {/* Amount not same ..... */}
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
                                  <p>
                                    {" "}
                                    Installment amount and Total fees is not
                                    same ...!
                                  </p>
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
                </div>
              </div>
            </div>
          </div>
        )}
        {/* student add..... */}
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
                      <p>Student details edit successfully...</p>
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
        {/* Student delete */}
        {isModalOpenWW && (
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
                      <p>Student delete successfully...</p>
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
      </div>
    </div>
  );
};

export default ViewStudent;
