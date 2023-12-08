import { FaAngleDown } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PiWarningCircleBold } from "react-icons/pi";

const AddContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  var [selectedOption, setSelectedOption] = useState("");
  var [selectedId, setSelectedId] = useState("");
  var [addCource, setAddCource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  const [isModalOpenWP, setIsModalOpenWP] = useState(false);
  const token = localStorage.getItem("token");

  const dropdownRef = useRef(null);

  const validationSchema = Yup.object().shape({
    // course: Yup.string().required("Course is required"),
    cantent: Yup.string()
    .required("Content is required ....")
    .matches(/^[A-Za-z]+$/, 'Content must contain only letters'),
    fees:Yup.string()
    .required('Fees is required ....')
    .matches(/^[0-9]+$/, 'Fees must contain only numbers'),
    duretion: Yup.string()
      .required("Duretion is required ....")
      // .matches(
      //   /^(?=[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      //   // "Password must have first uppercase letter, one lowercase letter, one number, and one special character",
      //   "Password must have first letter capital and one letter,number and character"
      // ),
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalW = () => {
    setIsModalOpenW(true);
  };

  const openModalWP = () => {
    setIsModalOpenWP(true);
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

  const handleOptionClick = (option) => {
    setSelectedOption(option.coursename);
    setSelectedId(option._id);
    setIsOpen(!isOpen);
  };

  

  useEffect(()=>{
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };

  },[])

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
   
    axios
      .get("http://localhost:5000/course/allcourse", {
        headers: {
          Authorization: token,
        },
      })
      .then((positive) => {
        setAddCource(positive.data.data1);
      })
      .catch((err) => {
        alert(err);
      });
  }, [token]);

  const addContentHandel = (values, { resetForm }) => {
    // if (selectedId) {
      axios
        .post(
          "http://localhost:5000/course/addcontent",
          {
            course_id: selectedId,
            content: values.cantent,
            duration:values.duretion,
            total_fees: values.fees,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((positive) => {
          setSelectedOption("");
          setSelectedId("");
          openModal();
          resetForm();  
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
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
    // }
    // else{
    //   // alert('edit image , course and installmemnt details')
    //   openModalWP()
    //   setTimeout(() => {
    //     setIsModalOpenWP(false);
    //     // closeModalWP()
    //   }, 2000);
    // }
  };

  return (
    <div>
      <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
        <h2 className="md:w-1/2 text-name w-auto sm:px-3 px-1 text-gray-800 text-2xl font-bold">
          Add Course Content
        </h2>
        <div className="md:w-1/2 text_12_cource w-auto sm:px-3 px-1 text-end text text-gray-500">
          <span className="text-blue-600">Home</span> /
          <span> Course Content</span> <span>/</span>
          <span> Add Content</span>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div
          className="sm:p-8 p-5 bg-white rounded-lg max-w-md w-full"
          style={{ boxShadow: "0px 0px 50px #D9D9DB" }}
        >
          <Formik
            initialValues={{
              // course: "",
              cantent: "",
              fees: "",
              duretion: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted with values:", values);
              addContentHandel(values, { resetForm });
            }}
          >
            {({ errors, touched }) => (
              <Form className="login-input">
                <div
                  className="relative inline-block text-left mb-4 w-full "
                  ref={dropdownRef}
                >
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Course
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      id="course"
                      name="course"
                      className="w-full mt-1 sm:p-3 p-2 border rounded-lg focus:border-indigo-600 transition-all duration-300"
                      placeholder="Select Option"
                      value={selectedOption}
                      onClick={toggleDropdown}
                      readOnly
                    />

                    <span
                      className={`absolute top-5 sm:pt-0.5 text-gray-600 right-3 transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      } transition-transform duration-300`}
                    >
                      <FaAngleDown />
                    </span>
                  </div>
                  <ul
                    className={`${
                      isOpen ? "block" : "hidden"
                    } absolute left-0 mt-0.5 w-full h-44 z-10 overflow-auto addContent bg-white border border-indigo-600 rounded-lg shadow-lg`}
                  >
                    {addCource.map((option, index) => (
                      <li
                        key={index}
                        value={option._id}
                        className={`py-2 px-4 cursor-pointer hover:bg-gray-200 m-1 hover:rounded-lg ${
                          selectedOption === option
                            ? "bg-gray-200 rounded-lg"
                            : ""
                        }`}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.coursename}
                      </li>
                    ))}
                  </ul>
                  
                </div>
                {/* <ErrorMessage
            name="course"
            component="div"
            className="text-red-500"
          /> */}

                <div className={`${"mb-4"}`}>
                  <label
                    htmlFor="cantent"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Content
                  </label>
                  <Field
                    type="text"
                    id="cantent"
                    name="cantent"
                    
                    className="mt-1 sm:p-3 p-2 w-full border rounded-md  focus:border-indigo-600"
                    placeholder="Add Content"
                  />
                  <ErrorMessage
                    name="cantent"
                    component={({ children }) => (
                      <div className="text-red-500 ms-0.5 mt-2 -mb-3 flex items-center">
                        <PiWarningCircleBold className="me-1 " />
                        <span className="">{children}</span>
                      </div>
                    )}
                  />
                </div>

                <div className={`${"mb-4"}`}>
                  <label
                    htmlFor="fees"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Fees
                  </label>
                  <Field
                    type="text"
                    id="fees"
                    name="fees"

                    className="mt-1 sm:p-3 p-2 w-full border rounded-md  focus:border-indigo-600"
                    placeholder="Enter Fees"
                  />
                  <ErrorMessage
                    name="fees"
                    component={({ children }) => (
                      <div className="text-red-500 ms-0.5 mt-2 -mb-3 flex items-center">
                        <PiWarningCircleBold className="me-1 " />
                        <span className="">{children}</span>
                      </div>
                    )}
                  />
                </div>

                <div className={`${"mb-4"}`}>
                  <label
                    htmlFor="duretion"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Duretion
                  </label>
                  <Field
                    type="text"
                    id="duretion"
                    name="duretion"

                    className="mt-1 sm:p-3 p-2 w-full border rounded-md  focus:border-indigo-600"
                    placeholder="Add Duretion"
                  />
                  <ErrorMessage
                    name="duretion"
                    component={({ children }) => (
                      <div className="text-red-500 ms-0.5 mt-2 -mb-2 flex items-center">
                        <PiWarningCircleBold className="me-1 " />
                        <span className="">{children}</span>
                      </div>
                    )}
                  />
                </div>

                <button
                  type="Submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-md w-full"
                >
                  Add Course Content
                </button>
              </Form>
            )}
          </Formik>
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
                    <p>Content add successfully...</p>
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
                    <p>Content is already exists ....!</p>
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
            <div className=" bg-yellow-200 text-yellow-800 border-b-4 border-yellow-600 p-5 mt-1 ">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0  flex items-center text-yellow-600">
                    <CgDanger className="w-7 h-7" />
                  </div>
                  <div className="ms-3">
                    <p className="font-bold">Warning</p>
                    <p>Enter all information ...!</p>
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
    </div>
  );
};

export default AddContent;
