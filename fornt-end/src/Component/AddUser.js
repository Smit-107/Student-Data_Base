import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import { PiWarningCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddUser = () => {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
    .required("User Name is required")
    .matches(/^[A-Za-z]+$/, 'User Name must contain only letters'),
    password: Yup.string()
      .required("Password is required ...")
      .min(8,'Password must have 8 character')
      .matches(
        /^(?=[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        // "Password must have first uppercase letter, one lowercase letter, one number, and one special character",
        "Password must have first letter capital and one letter,number and character"
      ),
  });

  // useEffect(() => {
  //   if (isModalOpen || isModalOpenW) {
  //     // Optionally, you can perform additional actions when the modal opens
  //   } else {
  //     // Optionally, you can perform additional actions when the modal closes
  //   }
  // }, [isModalOpen, isModalOpenW]);

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    // document.getElementById("userPasswordInput").focus();
  };

  const LoginUser = (values, { resetForm }) => {
    const { userName, password } = values;
    if (userName !== "" && password !== "") {
      axios
        .post("http://localhost:5000/register", {
          password: password,
          email: userName,
        })
        .then((positive) => {
          openModal();
          setTimeout(() => {
            setIsModalOpen(false);
            setIsModalOpenW(false);
          }, 2000);
          resetForm();
          setPasswordFocused(false);
          setEmailFocused(false);

          document.getElementById("userNameInput").blur();
          document.getElementById("userPasswordInput").blur();
        })
        .catch((err) => {
          alert(err);
          openModalW();
          setTimeout(() => {
            setIsModalOpenW(false);
          }, 2000);
          document.getElementById("userNameInput").blur();
          document.getElementById("userPasswordInput").blur();
        });
    }
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

  return (
    <div className="" style={{ height: `calc(100vh - 58.67px)` }}>
      <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
        <h2 className="sm:w-1/2 sm:px-3 px-1 text-gray-800 text-2xl text-name font-bold">
          Add New User
        </h2>
        <div className="sm:w-1/2 sm:px-3 px-1 text-name-all text-end text text-gray-500">
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Home
          </span>
          /<span> Manage User</span> <span>/</span>
          <span> Add User</span>
        </div>
      </div>
      <div className="w-full flex  items-center justify-center bg-gray-100 sm:p-0 p-2 flex-col add-height">
        <div
          className="bg-white sm:p-8 px-3 py-4 rounded-lg pt-10  sm:w-2/3"
          style={{ boxShadow: "0px 0px 50px #D9D9DB" }}
        >
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form submitted with values:", values);
              LoginUser(values, { resetForm });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={`relative w-full mb-3`}>
                  <label
                    className={`absolute left-4 transition-all bg-white ${
                      emailFocused
                        ? "-top-2 text-xs text-gray-600"
                        : "top-1/2 -translate-y-1/2 text-gray-400"
                    }`}
                    htmlFor="userNameInput"
                  >
                    Set User Name
                  </label>

                  <Field
                    type="text"
                    id="userNameInput"
                    name="userName"
                    className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                    onFocus={handleEmailFocus}
                    autoComplete="username"
                  />
                </div>
                <ErrorMessage
                  name="userName"
                  component={({ children }) => (
                    <div className="text-red-500 -mt-1 mb-3 ms-0.5 flex items-center">
                      <PiWarningCircleBold className="me-1 " />
                      <span className="">{children}</span>
                    </div>
                  )}
                />

                <div className={`relative w-full  mb-2`}>
                  <label
                    className={`absolute left-4 transition-all  bg-white ${
                      passwordFocused
                        ? "-top-2 text-xs text-gray-600"
                        : "top-1/2 -translate-y-1/2 text-gray-400"
                    }`}
                    htmlFor="userPasswordInput"
                  >
                    Set User Password
                  </label>

                  <Field
                    type={passwordVisible ? "text" : "password"}
                    id="userPasswordInput"
                    name="password"
                    className="w-full px-4 py-2 border rounded-lg outline-none border-indigo-600"
                    onFocus={handlePasswordFocus}
                    autoComplete="current-password"
                  />

                  {passwordVisible ? (
                    <FaRegEye
                      className="text-slate-500 absolute inset-y-0 right-0 me-3 m-auto cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="text-slate-500 absolute inset-y-0 right-0 me-3  m-auto cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>

                <ErrorMessage
                  name="password"
                  component={({ children }) => (
                    <div className="text-red-500 mb-2 ms-0.5 flex items-center">
                      <PiWarningCircleBold className="me-1 h-5 w-5 shadow-2xl" />
                      {children}
                    </div>
                  )}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full mt-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
                  >
                    {" "}
                    Add User
                  </button>
                </div>
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
                    <p>User add successfully.</p>
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
                    <p className="font-bold">Danger</p>
                    <p>User not add successfully.</p>
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

export default AddUser;
