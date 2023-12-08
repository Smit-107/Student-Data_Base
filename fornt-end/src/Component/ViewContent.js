import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";

const ViewContent = () => {
  const [viewContent, setViewContent] = useState([]);
  const token = localStorage.getItem("token");
  var [updateContent, setUpdateContent] = useState({
    content: "", // Provide default values or empty strings
    total_fees: "",
    duration: "",
  });
  var [updateCourceN, setUpdateCourceN] = useState("");
  var [viewCourceT, setViewCourceT] = useState(false);
  const [contentFocused, setContentFocused] = useState(true);

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/course/allcontent", {
        headers: {
          Authorization: token,
        },
      })

      .then((positive) => {
        setViewContent(positive.data.data);
        console.log(positive.data);
      })

      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchCourses();
  },[]);         // here i remove the dependency array

  const handleDelete = (course_id) => {
    axios
      .delete(`http://localhost:5000/course/contentdelete/${course_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        fetchCourses();
        openModalW();
        setTimeout(() => {
          setIsModalOpenW(false);
        }, 2000);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const EditContent = (_id) => {
    setViewCourceT(true);
    setContentFocused(true);
    axios
      .get(`http://localhost:5000/course/viewsinglecontent/${_id}`, {
        headers: {
          Authorization: token,
        },
      })

      .then(function (response) {
        const data = response.data.data;
        setUpdateContent(data);
        setUpdateCourceN(response.data.coursename);
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const handleContentChange = (e) => {
    setUpdateContent({ ...updateContent, [e.target.name]: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);

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

  const saveContentName = () => {
    setContentFocused(false);
    setViewCourceT(false);
    axios
      .put(
        "http://localhost:5000/course/updatecontent",
        {
          content_id: updateContent._id,
          content: updateContent.content,
          duration: updateContent.duration,
          total_fees: updateContent.total_fees,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((Positive) => {
        fetchCourses();
        openModal();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="bg-gray-100 ">
        <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
          <h2 className="md:w-1/2 w-auto text-name sm:px-3 px-1 text-gray-800 text-2xl font-bold">
            View Course Content
          </h2>
          <div className="md:w-1/2 text_12_cource w-auto sm:px-3 px-1 text-end text text-gray-500">
            <span className="text-blue-600">Home</span> /
            <span> Course Content</span> <span>/</span>
            <span> View Content</span>
          </div>
        </div>
        <div className="lg:px-12 sm:p-4 p-3 md:px-8">
          <div
            style={{ boxShadow: "0px 0px 20px #D9D9DB" }}
            className="form-height overflow-auto custom-scrollbar rounded-xl"
          >
            <div className="">
              <table className="w-full bg-white border border-gray-200  ">
                <thead className="mt-1 uppercase text-sm leading-normal w-full ">
                  <tr className="sticky top-0  bg-gray-100 text-gray-600 border-b border-black">
                    <th className="py-3 px-6 border-y text-left w-1/12">no.</th>
                    <th className="py-3 px-6 border-y text-left w-2/6">
                      course name
                    </th>
                    <th className="py-3 px-6 border-y text-left w-2/6">
                      content
                    </th>
                    <th className="py-3 px-6 border-y text-left w-1/12">
                      fees
                    </th>
                    <th className="py-3 px-6 border-y text-left w-1/12">
                      Duretion
                    </th>
                    <th className="py-3 px-6 border-y text-left w-1/12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 text-sm font-light text">
                  {viewContent.map((val, id) => {
                    return (
                      <tr
                        key={id}
                        className="border-b border-gray-200 hover:text-black hover:bg-gray-100 w-full"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap w-1/12">
                          {id + 1}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap  w-2/6">
                          {val?.coursename}
                        </td>
                        <td className="py-3 px-6 text-left w-2/6">
                          {val.content_id?.content}
                        </td>
                        <td className="py-3 px-6 text-left w-1/12">
                          {val.content_id?.total_fees}
                        </td>
                        <td className="py-3 px-6 text-left w-1/12">
                          {val.content_id?.duration}
                        </td>
                        <td className="py-3 px-6 text-left w-1/12">
                          <span className="flex">
                            <BsPencilSquare
                              onClick={() => {
                                EditContent(val.content_id?._id);
                              }}
                              className="text-blue-500 font-bold hover:text-blue-700 me-3 cursor-pointer"
                            />
                            <BsTrash
                              onClick={() => handleDelete(val.content_id?._id)}
                              className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                            />
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

      {viewCourceT && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                        Edit Course
                      </h3>
                    </div>
                  </div>
                </div>

                <form className="login-input mx-2 px-5">
                  <div
                    className={`relative mt-2 w-full ${
                      contentFocused ? "mb-4" : "mb-4"
                    }`}
                  >
                    <label
                      className={`absolute left-4 px-1 transition-all bg-white ${
                        contentFocused
                          ? "-top-2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-gray-400"
                      }`}
                      htmlFor="ContentNameInput"
                    >
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="ContentNameInput"
                      className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                      readOnly
                      value={updateCourceN}
                    />
                  </div>

                  <div
                    className={`relative mt-2 w-full ${
                      contentFocused ? "mb-4" : "mb-4"
                    }`}
                  >
                    <label
                      className={`absolute left-4 px-1 transition-all bg-white ${
                        contentFocused
                          ? "-top-2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-gray-400"
                      }`}
                      htmlFor="ContentAdd"
                    >
                      Edit Content
                    </label>
                    <input
                      type="text"
                      id="ContentAdd"
                      name="content"
                      value={updateContent.content}
                      onChange={handleContentChange}
                      className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div
                    className={`relative mt-2 w-full ${
                      contentFocused ? "mb-4" : "mb-4"
                    }`}
                  >
                    <label
                      className={`absolute px-1 left-4 transition-all bg-white ${
                        contentFocused
                          ? "-top-2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-gray-400"
                      }`}
                      htmlFor="FeesInput"
                    >
                      Edit Fees
                    </label>
                    <input
                      type="text"
                      id="FeesInput"
                      name="total_fees"
                      value={updateContent.total_fees}
                      onChange={handleContentChange}
                      className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div
                    className={`relative  mt-2 w-full ${
                      contentFocused ? "mb-4" : "mb-4"
                    }`}
                  >
                    <label
                      className={`absolute px-1 left-4 transition-all bg-white ${
                        contentFocused
                          ? "-top-2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-gray-400"
                      }`}
                      htmlFor="DurationInput"
                    >
                      Edit Duration
                    </label>
                    <input
                      type="text"
                      id="DurationInput"
                      name="duration"
                      onChange={handleContentChange}
                      value={updateContent.duration}
                      className="w-full px-4 py-2 border  border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </form>

                <div className=" px-4 py-3 sm:pb-6 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                    onClick={() => {
                      saveContentName();
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setContentFocused(false);
                      setViewCourceT(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <p>Content delete successfully...</p>
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

export default ViewContent;
