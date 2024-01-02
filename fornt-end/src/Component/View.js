import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const View = () => {
  const navigate = useNavigate();

  let [inputStudent, setInputStudent] = useState([]);
  const param = useParams();
  const token = localStorage.getItem("token");
  const [remaining_fees, setRemainingFees] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/course/viewstudentDetail/${param.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        console.log(response.data);
        const data = response.data.data;
        setInputStudent(data);

        const installmentDetails = data.installment_details || [];
        let totalPaidAmount = 0;

        installmentDetails.forEach((installment) => {
          if (installment.p_status === "Paid") {
            totalPaidAmount += installment.amount;
          }
        });

        const remainingFees = data.total_fees - totalPaidAmount;
        setRemainingFees(remainingFees);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [param.id, token]);

  return (
    <div className="">
      <div className="bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav
          className=" bg-indigo-700 px-4 py-2 sticky"
          style={{ top: "58.57px" }}
        >
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">
              Student Profile
            </h1>
            {/* <div onClick={()=>{navigate("/viewstudent")}}>closed buttom</div> */}
            <button
              onClick={() => {
                navigate("/viewstudent");
              }}
              className="p-2 rounded-full hover:bg-indigo-500 text-white focus:outline-none focus:bg-blue-700 focus:text-white transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Profile Card */}
        <div className="bg-gray-100 m-8 md:mx-14">
          <div className="bg-white rounded-lg flex flex-col shadow-lg p-8">
            <div className="flex items-center justify-center">
              <img
                src={
                  inputStudent.image
                    ? "http://localhost:5000/images/" + inputStudent.image
                    : ""
                }
                alt="Student's Profile Picture"
                className="w-32 h-32 rounded-full"
              />
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-semibold">
                {inputStudent.studentname} {inputStudent.fathername}{" "}
                {inputStudent.surname}
              </h2>
              <p className="text-gray-500">{inputStudent.coursename}</p>
            </div>

            <div className="mt-8 flex md:flex-row flex-col">
              <div className="md:w-1/2 md:mb-0 mb-2">
                <h3 className="text-xl font-semibold">Student Information</h3>
                <ul className="mt-2 text-gray-800">
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Student Contact No:
                    </span>
                    {inputStudent.stu_contact_no}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Parent Contact No:
                    </span>
                    {inputStudent.parent_contact_no}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Address:
                    </span>
                    {inputStudent.address}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Birth of Date:
                    </span>
                    {inputStudent.dob}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Qualification:
                    </span>
                    {inputStudent.qualification}
                  </li>
                  <li>
                    <span className="font-semibold text-gray-700 me-1">
                      Reference:
                    </span>
                    {inputStudent.reference}
                  </li>
                  {inputStudent.reference_name !== "Advertisement" && (
                    <li>
                      <span className="font-semibold text-gray-700 me-1">
                        Reference Name:
                      </span>
                      {inputStudent.reference_name}
                    </li>
                  )}
                </ul>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold">Course Information</h3>
                <ul className="mt-2 text-gray-800">
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Course Name:
                    </span>
                    {inputStudent.coursename}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Course Content:
                    </span>
                    {inputStudent.course_content}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Course Duration:
                    </span>
                    {inputStudent.course_duration}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Course Fees:
                    </span>
                    {inputStudent.total_fees}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Remainig Fees:
                    </span>
                    {remaining_fees}
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl mt-8 font-semibold">
              Institute Information
            </h3>

            <div className=" flex md:flex-row flex-col">
              <div className="md:w-1/2">
                <ul className="mt-2 text-gray-800">
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Joining Date:
                    </span>
                    {inputStudent.joining_date}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Ending Date :
                    </span>
                    {inputStudent.ending_date}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Running Topic:
                    </span>
                    {inputStudent.running_topic}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Pc-Laptop:
                    </span>
                    {inputStudent.pc_laptop}
                  </li>
                  {inputStudent.pc_laptop !== "Laptop" && (
                    <li>
                      <span className="text-gray-700 font-semibold me-1">
                        Pc No:
                      </span>
                      {inputStudent.pc_no}
                    </li>
                  )}
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Laptop Compulsory:
                    </span>
                    {inputStudent.laptop_compulsory}
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <ul className="md:mt-2 text-gray-800">
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Job Responsbility:
                    </span>
                    {inputStudent.job_responsbility}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Faculty Name:
                    </span>
                    {inputStudent.faculty}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Batch Time:
                    </span>
                    {inputStudent.batch_time}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      Gst:
                    </span>
                    {inputStudent.gst}
                  </li>
                  <li>
                    <span className="text-gray-700 font-semibold me-1">
                      College Course:
                    </span>
                    {inputStudent.college_course}
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex sm:flex-row flex-col">
              <div className="sm:w-1/2 sm:mb-0 mb-2">
                <h3 className="text-xl font-semibold">Extra Note</h3>
                <div className="mt-2  space-x-4">{inputStudent.extra_note}</div>
              </div>
              <div className="sm:w-1/2">
                <h3 className="text-xl font-semibold">Reception Note</h3>
                <div className="mt-2  space-x-4">
                  {inputStudent.reception_note}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts Section */}
        <div className="bg-gray-100 m-8 md:mx-14">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold">Installment Details</h2>
            {/* You can map through and display user posts here */}
            <div className="mt-2">
              {inputStudent.installment_details?.map((val, id) => {
                return (
                  <div key={id} className="border-b border-gray-300 py-4">
                    <h3 className="text-lg mb-2 font-semibold">
                      Installment {id + 1}
                    </h3>
                    <div className="flex sm:flex-row flex-col">
                      <input
                        type="text"
                        name="demo"
                        value={val.amount}
                        readOnly
                        className=" w-2/5 border rounded-md px-3 py-1.5 me-4"
                        id=""
                      />
                      <input
                        type="text"
                        name="demo"
                        value={val.installment_date}
                        readOnly
                        className="w-2/5 border rounded-md px-3 py-1.5 me-4"
                        id=""
                      />
                      <input
                        type="text"
                        name="demo"
                        value={val.p_status}
                        readOnly
                        className="w-1/5 border rounded-md px-3 py-1.5 "
                        id=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
