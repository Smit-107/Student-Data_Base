import React, { useRef, useState } from "react";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { PiWarningCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const formRef = useRef(null);
  const [emailFocused, setEmailFocused] = useState(false);
  const [addCourse, setAddCourse] = useState("");
  const token = localStorage.getItem("token");
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  const navigate = useNavigate()
  const courseNamePattern = /^[A-Za-z\s]+$/;
  
  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openModalW = () => {
    setIsModalOpenW(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalW = () => {
    setIsModalOpenW(false);
  };

  const AddCourse = () => {
    if (addCourse === "" || !courseNamePattern.test(addCourse)) {
      if (addCourse === "") {
        setEmailFocused(false);
        setError(true);
        if (formRef.current) {
          formRef.current.blur();
        }
      }
      if (!courseNamePattern.test(addCourse)) {
        setError(true);
      }
    } else {
      axios
        .post(
          "http://localhost:5000/course/addcourse",
          {
            coursename: addCourse,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((positive) => {
          setAddCourse("");
          openModal();
          setTimeout(() => {
            setIsModalOpen(false);
          }, 2000);
          setEmailFocused(false);
          setError(false);
          if (formRef.current) {
            formRef.current.blur();
          }
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
    }
  };

  return (
    <div>
      <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
        <h2 className="sm:w-1/2 sm:px-3 text-name px-1 text-gray-800 text-2xl font-bold">
          Add New Course
        </h2>
        <div className="md:w-1/2 text_12_cource w-auto sm:px-3 px-1 text-end text text-gray-500">
          <span className="text-blue-600 cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Home</span> /
          <span> Manage Course</span> <span>/</span>
          <span> Add Course</span>
        </div>
      </div>
      <div className="w-full flex items-center sm:justify-center m-auto bg-gray-100 sm:p-0 p-2   flex-col add-height">
        <div
          style={{ boxShadow: "0px 0px 50px #D9D9DB" }}
          className="bg-white sm:p-8  px-3 py-4 rounded-lg m-auto sm:w-2/3"
        >
          <h2 className="text-xl font-semibold mb-5 text-gray-800">
            Course Name :-
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              AddCourse();
            }}
          >
            <div className={`relative w-full  ${error === true && addCourse === "" ? "" : "mb-4"}`}>
              <label
                className={`absolute left-4 transition-all bg-white ${
                  emailFocused
                    ? "-top-2 text-xs text-blue-500 pe-0.5"
                    : "top-1/2 duration-150 -translate-y-1/2 text-gray-400"
                }`}
                htmlFor="userNameInput"
              >
                Add New Course
              </label>
              <input
                type="text"
                id="userNameInput"
                className={`w-full px-4 py-2 border capitalize border-gray-300 rounded-md focus:outline-none focus:border-indigo-600`}
                onFocus={handleEmailFocus}
                value={addCourse}
               
                onChange={(addcourse) => {
                  setAddCourse(addcourse.target.value);
                  if (addCourse !== '' && courseNamePattern.test(addCourse) ){
                      setError(false)
                  }
                  
                }}
                ref={formRef}
              />
            </div>
            {error && addCourse === "" && (
              <div className={`text-red-500 mb-2 mt-2 ms-0.5 flex items-center`}>
                <PiWarningCircleBold className="me-2 h-5 w-5" />
                {'Course name is required'}
              </div>
            )}
            {error && addCourse !== "" && !courseNamePattern.test(addCourse) && (
              <div className={`text-red-500 mb-2 mt-2 ms-0.5 flex items-center`}>
                <PiWarningCircleBold className="me-2 h-5 w-5" />
                {'Only text characters are allowed....'}
              </div>
            )}

            <div>
              <button
                type="submit"
                value={"Add User"}
                className="w-full focus-visible:outline-none bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
              >
                Add User
              </button>
            </div>
          </form>
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
                    <p>Course add successfully...</p>
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
                    <p>Cource is already exists ....!</p>
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
  );
};

export default AddCourse;
