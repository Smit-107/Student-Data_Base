import React, { useEffect, useRef, useState } from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { ImCopy } from "react-icons/im";
import axios from "axios";
import { CgDanger } from "react-icons/cg";
import Pagination from './Pagination';
import { PiWarningCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const TableExample = () => {
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(1);
  const [start, setStart] = useState(1);
  const [error, setError] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [courseFocused, setCourseFocused] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenP, setIsModalOpenP] = useState(false);
  const [isModalOpenW, setIsModalOpenW] = useState(false);
  var [viewCource, setViewCource] = useState([]);
  var [viewCourceT, setViewCourceT] = useState(false);
  const courseNamePattern = /^[A-Za-z\s]+$/;
  var [updateCource, setUpdateCource] = useState({
    course_id: "",
    coursename: "",
  });

  useEffect(() => {
    fetchCourses()
  },[page]);

  const handleCourseFocus = () => {
    setCourseFocused(true);
  };

  const fetchCourses = () => {
    axios
      .get(`http://localhost:5000/course/allcourse?page_no=${page}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((positive) => {
        console.log(positive.data);
        setViewCource(positive.data.data);
        if(positive.data.lastpage===0){
          setLastPage(positive.data.lastpage=1);
        }
        else{
          setLastPage(positive.data.lastpage);
        }
        setStart(positive.data.start);
        if (page > 1 && page > positive.data.lastpage) {
          setPage(positive.data.lastpage);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const DeleteCource = (course_id) => {
    axios
      .delete(`http://localhost:5000/course/coursedelete/${course_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        openModalW();
        setTimeout(() => {
          setIsModalOpenW(false);
        }, 2000);

          fetchCourses();
      })
      .catch(function (error) {
        alert(error);
      });
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

  const EditCourceName = (_id) => {
    setViewCourceT(true);
    setCourseFocused(true);
    axios
      .get(`http://localhost:5000/course/viewsinglecourse/${_id}`, {
        headers: {
          Authorization: token,
        },
      })

      .then(function (response) {
        const data = response.data.data;
        setUpdateCource(data);
      })
      .catch(function (error) {
        alert(error);
      });
  };


  const openModalP = () => {
    setIsModalOpenP(true);
  };

  const closeModalP = () => {
    setIsModalOpenP(false);
  };

  const handleCourceChange = (e) => {
    if (updateCource.coursename !== '' && courseNamePattern.test(updateCource.coursename) ){
      setError(false)
  }
    setUpdateCource({ ...updateCource, [e.target.name]: e.target.value });
  };

  const saveCourseName = () => {
   
    if (updateCource.coursename === "" || !courseNamePattern.test(updateCource.coursename)) {
      if (updateCource.coursename === "") {
        setCourseFocused(false);
        setError(true);
        if (formRef.current) {
          formRef.current.blur();
        }
      }
      if (!courseNamePattern.test(updateCource.coursename)) {
        setError(true);
      }
    }
   else{
    axios.put(
      "http://localhost:5000/course/updatecourse",
      {
        course_id: updateCource._id,
        coursename: updateCource.coursename,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    .then(function (response) {
      if (response.data.status === "Course Update Successfully") {
        fetchCourses();
        openModal();
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
        setViewCourceT(false);
        if (formRef.current) {
          formRef.current.blur();
        }
        setCourseFocused(false);
        setError(false);
      }
    })
    .catch(function (error) {
      if (error.response.status === 400) {
        openModalP();
        setTimeout(() => {
          setIsModalOpenP(false);
        }, 2000);
      } else {
        alert(error);
      }
    });
   }
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // The text has been successfully copied to the clipboard.
      // You can provide feedback to the user here if needed.
    } catch (err) {
      // Handle any errors that may occur during copying.
      console.error('Failed to copy text: ', err);
    }
  };  

  return (
    <div>
      <div className="bg-gray-100 ">
        <div className="px-2 py-4 bg-gray-100 flex flex_col justify-between items-center">
          <h2 className="md:w-1/2 w-auto text-name sm:px-3 px-1 text-gray-800 text-2xl font-bold">
            View Course
          </h2>
          <div className="md:w-1/2 w-auto text_12_cource sm:px-3 px-1 text-end text text-gray-500">
          <span className="text-blue-600 cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Home</span> /
            <span> Manage Content</span> <span>/</span>
            <span> View Course</span>
          </div>
        </div>

        <div className="lg:px-12 sm:p-4 p-3 md:px-8">
          <div
            style={{ boxShadow: "0px 0px 20px #D9D9DB" }}
            className="form-height custom-scrollbar  rounded-xl"
            //  grid content-between
          >
            {/* <div className="grid content-between"> */}
            <table className="w-full bg-white border border-gray-200  ">
              <thead className="mt-1 uppercase text-sm leading-normal w-full ">
                <tr className="sticky top-0  bg-gray-100 text-gray-600 border-b border-black">
                  <th className="py-3 px-6 border-y text-left w-1/6">no.</th>
                  <th className="py-3 px-6 border-y text-left w-6/12">
                    course name
                  </th>
                  <th className="py-3 px-6 border-y text-left w-1/5">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-900 text-sm font-light text ">
                {viewCource.map((val, id) => {
                  return (
                    <tr
                      key={id}
                      className="border-b border-gray-200 hover:text-black hover:bg-gray-100 w-full"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap w-1/6">
                        {id + 1 + start}
                      </td>
                      <td className="py-3 px-6 text-left capitalize whitespace-nowrap  w-6/12">
                        {val.coursename}
                      </td>
                      <td className="py-3 px-6 text-left w-1/5">
                        <span className="flex">
                          <BsPencilSquare
                            onClick={() => {
                              EditCourceName(val._id);
                            }}
                            className="text-blue-500 font-bold hover:text-blue-700 me-3 cursor-pointer"
                          />
                          <BsTrash
                            onClick={() => DeleteCource(val._id)}
                            className="text-red-500 font-bold hover:text-red-700 me-3 cursor-pointer"
                          />

                          {/* <CopyToClipboard text={val.coursename} >
                              <ImCopy className="text-green-600 font-bold hover:text-green-800 cursor-pointer" />
                          </CopyToClipboard> */}

                          <ImCopy
                            onClick={() => {
                              handleCopyToClipboard(val.coursename);
                            }}
                            className="text-green-600 font-bold hover:text-green-800 cursor-pointer"
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="sticky top-full flex items-center justify-between border-y  bottom-0 mb-1.5 border-gray-200 bg-white px-4 sm:py-5 py-3 sm:px-6">
              <Pagination
                currentPage={page}
                totalPages={lastpage}
                onPageChange={handlePageChange}
              />
            </div>

            {/* </div> */}
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
                <form  onSubmit={ (e)=>{
                  e.preventDefault();
                  saveCourseName()
                  }}>
                  <div className="m-2  px-5">
                    <div
                      className={`relative w-full  ${
                        error === true && updateCource.coursename === ""
                          ? ""
                          : "mb-4"
                      }`}
                    >
                      <label
                        className={`absolute left-4 transition-all bg-white ${
                          courseFocused
                            ? "-top-2 text-xs text-blue-500"
                            : "top-1/2 duration-150 -translate-y-1/2 text-gray-400"
                        }`}
                        htmlFor="userNameInput"
                      >
                        Add New Course
                      </label>
                      <input
                        type="text"
                        id="userNameInput"
                        name="coursename"
                        className="w-full px-4 py-2 border capitalize border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                        onFocus={handleCourseFocus}
                        value={updateCource.coursename}
                        onChange={(e) => {
                          handleCourceChange(e);
                        }}
                        ref={formRef}
                      />
                    </div>
                    
                    {error && updateCource.coursename === "" && (
                      <div className={`text-red-500 mb-2 mt-2 ms-0.5 flex items-center`}>
                        <PiWarningCircleBold className="me-2 h-5 w-5" />
                        {'Course name is required'}
                      </div>
                    )}
                    {error && updateCource.coursename !== "" && !courseNamePattern.test(updateCource.coursename) && (
                      <div className={`text-red-500 mb-2 mt-2 ms-0.5 flex items-center`}>
                        <PiWarningCircleBold className="me-2 h-5 w-5" />
                        {'Only text characters are allowed....'}
                      </div>
                    )}

                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                     
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setViewCourceT(false);
                        setCourseFocused(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
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
                    <p>Course delete successfully...</p>
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

      {isModalOpenP && (
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
                    <p>Course is already exists ....!</p>
                  </div>
                </div>
                <button
                  onClick={closeModalP}
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

export default TableExample;
