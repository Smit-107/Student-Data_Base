// import React from 'react'
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    if (tkn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      LoginUser();
    }
  };

  const LoginUser = () => {
    axios
      .post("http://localhost:5000/login", {
        password: password,
        email: userName,
      })

      .then((positive) => {
        localStorage.setItem("token", positive.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  return (
    <section className="h-screen" style={{ userSelect: "none" }}>
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 basis-auto md:w-6/12  lg:w-6/12 xl:w-6/12">
            <img src={require('../images/draw2.png')} className="w-full" alt="login image" />
           
            
          </div>

          <div className="flex md:min-h-full flex-1  flex-col justify-center px-6 pb-10 md:py-12 lg:pe-8">
            <div className="sm:mx-auto justify-center flex items-center sm:w-full sm:max-w-sm">
              <img
                className="lg:me-10 md:me-5 sm:me-7 me-3  h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                User Login Page
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6 login-input">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User Name
                  </label>
                  <div className="mt-2">
                    <input
                      name="email"
                      id="email"
                      type="text"
                      autoComplete="email"
                      value={userName}
                      onChange={(userNmae) => {
                        setUserName(userNmae.target.value);
                      }}
                      required
                      placeholder="Enter User Name ....."
                      className="block w-full rounded-md border-0 py-1.5 ps-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="text-sm">
                      <span className="font-semibold text-indigo-600 hover:text-indigo-700">
                        Forgot password?
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="relative">
                      <input
                        name="password"
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter password ....."
                        autoComplete="current-password"
                        value={password}
                        onChange={(password) => {
                          setPassword(password.target.value);
                        }}
                        required
                        onKeyDown={handleKeyDown}
                        className="block w-full ps-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      {passwordVisible ? (
                        <FaRegEye
                          className="text-slate-500 absolute inset-y-0 right-0 me-3 flex items-center m-auto cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaRegEyeSlash
                          className="text-slate-500 absolute inset-y-0 right-0 me-3 flex items-center m-auto cursor-pointer"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2">
                  <div
                    onClick={LoginUser}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                  >
                    Log In
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
