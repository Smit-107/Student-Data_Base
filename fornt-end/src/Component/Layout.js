import { Link, useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import {
  FaList,
  FaRegComments,
  FaBars,
  FaMagnifyingGlass,
  FaCircleNotch,
  FaRegBell,
  FaUserPlus,
  FaListUl,
  FaHouseUser,
  FaUsersGear,
  FaUsersLine,
  FaRegCircle,
  FaAngleLeft,
} from "react-icons/fa6";

import { TbSettingsFilled } from "react-icons/tb";
import {
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
  FaPencilRuler,
  FaTachometerAlt,
  FaUserAlt,
  FaUserCog,
} from "react-icons/fa";
import "../App.css";
import { useLocation } from "react-router-dom";

import { RiListSettingsFill, RiPlayListAddFill } from "react-icons/ri";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const params = useParams();
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const [isUser, setIsUser] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isAdmission, setIsAdmission] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
    // isMenuOpen ?  setMenuOpen(false) :setMenuOpen(true);
  };
  // var menuWidth = isMenuOpen ? '73px' : '250px';

  useEffect(() => {
    const updateMenuState = () => {
      //   const screenWidth = window.innerWidth;
      //   setMenuOpen(screenWidth == 992);
      setMenuOpen(window.innerWidth <= 992);
    };

    updateMenuState();

    window.onresize = updateMenuState;

    return () => {
      window.onresize = null;
    };
  }, []);

  const toggleDropdownUser = (e) => {
    if (e === "user") {
      setIsUser(!isUser);
    }
    if (e === "course") {
      setIsCourse(!isCourse);
    }
    if (e === "content") {
      setIsContent(!isContent);
    }
    if (e === "admission") {
      setIsAdmission(!isAdmission);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const location = useLocation();
  const [isFullScreen, setIsFullScreen] = useState(false);
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex sticky top-0 ">
      <span
        style={{ transition: "0.5s" }}
        className={`menu-bg all part-1 min-h-screen ${
          isMenuOpen ? "w-73px" : "w-250px"
        }   `}
        //  onMouseEnter={handlePart1Hover} onMouseLeave={handlePart1Leave}
      >
        <div className="flex items-center align-middle px-2 py-3 border-b sticky top-0 border-gray-600">
          <img
            src={require("../images/AdminLTELogo.webp")}
            className="ms-3 me-2 rounded-full"
            style={{
              boxShadow:
                "0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)",
            }}
            height={"33px"}
            width={"33px"}
            alt=""
            srcSet=""
          />

          {isMenuOpen === false ? (
            <span
              className=" text-xl font-light  brand-text"
              style={{ color: "rgba(255,255,255,.8)", whiteSpace: "nowrap" }}
            >
              Admin Panel
            </span>
          ) : (
            <span
              className=" text-xl font-light brand-text"
              style={{
                color: "rgba(255,255,255,.8)",
                whiteSpace: "nowrap",
                opacity: 0,
              }}
            >
              Admin Panel
            </span>
          )}
        </div>

        <div
          className="menu-bg aa px-2 w-full  sticky "
          style={{ height: `calc(100vh - 57.67px)`, top: "57.67px" }}
        >
          <div className="my-4 pb-4 flex items-center border-b border-gray-600">
            <img
              className="ms-3 rounded-full"
              style={{
                height: "30px",
                width: "30px",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)",
              }}
              alt="Remy Sharp"
              src={require("../images/user2.jpg")}
            />

            {isMenuOpen === false ? (
              <span
                className="ps-3 p-2 text-gray-300  brand-text"
                style={{ whiteSpace: "nowrap" }}
              >
                Alexander Pierce
              </span>
            ) : (
              <span
                className="ps-3 p-2 text-gray-300 brand-text"
                style={{ whiteSpace: "nowrap", opacity: 0 }}
              >
                Alexander Pierce
              </span>
            )}
          </div>

          <nav className="side-bar">
            <ul>
              <li className="dropdown">
                <Link
                  to={"/dashboard"}
                  className={`${
                    location.pathname === "/dashboard" ? "active" : ""
                  } `}
                >
                  <span>
                    <FaTachometerAlt className="ms-0.5 h-5 w-5" />
                  </span>
                  <span
                    className={`ms-2 brand-text ${
                      isMenuOpen === false ? "" : "opacity-0"
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="dropdown">
                <div
                  onClick={() => {
                    toggleDropdownUser("user");
                  }}
                  className={`${
                    location.pathname === "/adduser" ||
                    location.pathname === "/viewuser"
                      ? "active"
                      : ""
                  } flex justify-between items-center align-middle`}
                >
                  <span className="flex items-center">
                    <span>
                      <FaUserAlt className="ms-0.5 h-5 w-5" />
                    </span>
                    <span
                      className={`ms-2 brand-text ${
                        isMenuOpen === false ? "" : "opacity-0"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Manage User
                    </span>
                  </span>
                  <span
                    style={{
                      transform: isUser ? "rotate(270deg)" : "rotate(0deg)",
                      transition: "transform 0.6s",
                    }}
                  >
                    <FaAngleLeft className="font-bold mt-0.5" />
                  </span>
                </div>

                <ul style={{ maxHeight: isUser ? "200px" : "0" }}>
                  <li>
                    <Link
                      to={"/adduser"}
                      className={`${
                        location.pathname === "/adduser" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <FaUserPlus
                          className="h-4 w-4"
                          style={{ marginLeft: "5px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Add User
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/viewuser"}
                      className={`${
                        location.pathname === "/viewuser" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <FaUserCog
                          className="h-4 w-4"
                          style={{ marginLeft: "5px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        View User
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <div
                  onClick={() => {
                    toggleDropdownUser("course");
                  }}
                  className={`${
                    location.pathname === "/addcourse" ||
                    location.pathname === "/viewcourse"
                      ? "active"
                      : ""
                  } flex justify-between items-center align-middle`}
                >
                  <span className="flex items-center">
                    <span>
                      <FaListUl className="ms-0.5 h-5 w-5" />
                    </span>
                    <span
                      className={`ms-2 brand-text ${
                        isMenuOpen === false ? "" : "opacity-0"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Manage Course
                    </span>
                  </span>
                  <span
                    style={{
                      transform: isCourse ? "rotate(270deg)" : "rotate(0deg)",
                      transition: "transform 0.6s",
                    }}
                  >
                    <FaAngleLeft className="font-bold mt-0.5" />
                  </span>
                </div>

                <ul style={{ maxHeight: isCourse ? "200px" : "0" }}>
                  <li>
                    <Link
                      to={"/addcourse"}
                      className={`${
                        location.pathname === "/addcourse" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <RiPlayListAddFill
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Add Course
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/viewcourse"}
                      className={`${
                        location.pathname === "/viewcourse" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <RiListSettingsFill
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        View Course
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <div
                  onClick={() => {
                    toggleDropdownUser("content");
                  }}
                  className={`${
                    location.pathname === "/addcontent" ||
                    location.pathname === "/viewcontent"
                      ? "active"
                      : ""
                  } flex justify-between items-center align-middle`}
                >
                  <span className="flex items-center">
                    <span>
                      <FaPencilRuler className="ms-0.5 h-5 w-5" />
                    </span>
                    <span
                      className={`ms-2 brand-text ${
                        isMenuOpen === false ? "" : "opacity-0"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Course Content
                    </span>
                  </span>
                  <span
                    style={{
                      transform: isContent ? "rotate(270deg)" : "rotate(0deg)",
                      transition: "transform 0.6s",
                    }}
                  >
                    <FaAngleLeft className="font-bold mt-0.5" />
                  </span>
                </div>

                <ul style={{ maxHeight: isContent ? "200px" : "0" }}>
                  <li>
                    <Link
                      to={"/addcontent"}
                      className={`${
                        location.pathname === "/addcontent" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <FaCircleNotch
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Add Content
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/viewcontent"}
                      className={`${
                        location.pathname === "/viewcontent" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <FaRegCircle
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        view Content
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <div
                  onClick={() => {
                    toggleDropdownUser("admission");
                  }}
                  className={`${
                    location.pathname === "/addstudent" ||
                    location.pathname === "/viewstudent" ||
                    location.pathname === `/viewstudent/${params.id}`
                      ? "active"
                      : ""
                  } flex justify-between items-center align-middle`}
                >
                  <span className="flex items-center">
                    <span>
                      <FaHouseUser className="ms-0.5 h-5 w-5" />
                    </span>
                    <span
                      className={`ms-2 brand-text ${
                        isMenuOpen === false ? "" : "opacity-0"
                      }`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Admission
                    </span>
                  </span>
                  <span
                    style={{
                      transform: isAdmission
                        ? "rotate(270deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.6s",
                    }}
                  >
                    <FaAngleLeft className="font-bold mt-0.5" />
                  </span>
                </div>

                <ul style={{ maxHeight: isAdmission ? "200px" : "0" }}>
                  <li>
                    <Link
                      to={"/addstudent"}
                      className={`${
                        location.pathname === "/addstudent" ? "activeIn" : ""
                      }`}
                    >
                      <span className="">
                        <FaUsersLine
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Add Student
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/viewstudent"}
                      className={`${
                        location.pathname === "/viewstudent" ||
                        location.pathname === `/viewstudent/${params.id}`
                          ? "activeIn"
                          : ""
                      }`}
                    >
                      <span className="">
                        <FaUsersGear
                          className="h-4 w-4"
                          style={{ marginLeft: "4px" }}
                        />
                      </span>
                      <span
                        className={`ms-2 brand-text ${
                          isMenuOpen === false ? "" : "opacity-0"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        view Student
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </span>

      <span
        className={`${isMenuOpen === false ? "full" : "full-1"}`}
        style={{ transition: "0.5s" }}
      >
        <header className="App-header sticky top-0 bg-white border-b z-10 border-gray-400 part-2">
          <div className="min-h-full">
            <nav>
              <div className="mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex items-center justify-between h-[57.67px]">
                  <div className="flex items-center">
                    <div
                      className="flex-shrink-0 cursor-pointer"
                      onClick={toggleMenu}
                    >
                      <FaBars className="h-5 w-5 nav-icon" />
                    </div>

                    {/* menu name */}

                    <div className=" hidden md:block">
                      <div className="ml-7 flex items-baseline space-x-4">
                        <span className="bg-gray-900  text-white rounded-md lg:px-3 p-2 py-2 text-sm font-medium">
                          Home
                        </span>
                        <span className="text-gray-500 hover:bg-gray-700  font-semibold hover:text-white rounded-md md:px-3 ps-2 py-2 text-sm ">
                          Add Student
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Search button */}

                  <div className="hidden sm:block">
                    {/* <div className="block"> */}
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full"
                        onClick={toggleSearch}
                      >
                        <span className="sr-only">View notifications</span>
                        <FaMagnifyingGlass
                          className={`my-2 lg:mx-4 me-3 h-5 w-5 font-extrabold ${
                            isSearchOpen ? "text-black" : "nav-icon"
                          } `}
                        />
                      </button>

                      {/* Search input */}
                      {isSearchOpen && (
                        <div className="relative  rounded-full p-1 border border-black">
                          <input
                            style={{ transition: "0.5s" }}
                            name="serch icon"
                            type="text"
                            className="bg-transparent text-black px-3 py-1 rounded-full focus:outline-none"
                            placeholder="Search..."
                          />
                        </div>
                      )}

                      <button type="button" className="relative rounded-full">
                        {/* <span className="absolute -inset-1.5"></span> */}
                        {/* <span className="sr-only">View notifications</span> */}
                        <FaRegComments className="my-2 lg:mx-4 mx-3 h-6 w-6 nav-icon font-extrabold"></FaRegComments>
                      </button>

                      <button type="button" className="relative rounded-full">
                        <FaRegBell className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold"></FaRegBell>
                      </button>

                      <button
                        type="button"
                        className="relative rounded-full"
                        onClick={toggleFullScreen}
                      >
                        {isFullScreen ? (
                          <FaCompressArrowsAlt className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold" />
                        ) : (
                          <FaExpandArrowsAlt className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold" />
                        )}
                      </button>

                      <button type="button" className="relative rounded-full">
                        <TbSettingsFilled
                          onClick={logout}
                          className="my-2 lg:ms-4 mx-3 h-6 w-6 nav-icon font-extrabold App-Setting"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Mobile menu button */}
                  <div className="me-2 flex md:hidden">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      aria-controls="mobile-menu"
                      aria-expanded={isMobileMenuOpen}
                      onClick={toggleMobileMenu}
                    >
                      <span className="absolute -inset-0.5"></span>
                      <span className="sr-only">Open main menu</span>
                      {/* Hamburger icon */}
                      <FaList className="m-0.5"></FaList>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile menu, shown/hidden based on screen size */}
              <div
                className={`md:hidden ${
                  isMobileMenuOpen ? "block" : "hidden"
                } border-t transition-all border-gray-500`}
                id="mobile-menu"
                style={{
                  transition: "opacity 0.5s",
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                <div className="space-y-1 px-2 pb-3 transition-all pt-2 sm:px-3 flex justify-center align-middle items-center flex-col">
                  <div className="ml-7 flex items-baseline space-x-4">
                    <span className="bg-gray-900  text-white rounded-md px-3 py-2 text-sm font-medium">
                      Home
                    </span>
                    <span className="text-gray-500 hover:bg-gray-700  font-semibold hover:text-white rounded-md px-3 py-2 text-sm ">
                      Add Student
                    </span>
                    <span className="text-gray-500 hover:bg-gray-700  font-semibold hover:text-white rounded-md px-3 py-2 text-sm ">
                      View Student
                    </span>
                  </div>

                  <div className="sm:hidden block">
                    {/* <div className="block"> */}
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full"
                        onClick={toggleSearch}
                      >
                        <span className="sr-only">View notifications</span>
                        <FaMagnifyingGlass
                          className={`my-2 lg:mx-4 me-3 h-5 w-5 font-extrabold ${
                            isSearchOpen ? "text-black" : "nav-icon"
                          } `}
                        />
                      </button>

                      {/* Search input */}
                      {isSearchOpen && (
                        <div className="relative  rounded-full p-1 border border-black">
                          <input
                            style={{ transition: "0.5s" }}
                            name="serch icon"
                            type="text"
                            className="bg-transparent text-black px-3 py-1 rounded-full focus:outline-none"
                            placeholder="Search..."
                          />
                        </div>
                      )}

                      <button type="button" className="relative rounded-full">
                        {/* <span className="absolute -inset-1.5"></span> */}
                        {/* <span className="sr-only">View notifications</span> */}
                        <FaRegComments className="my-2 lg:mx-4 mx-3 h-6 w-6 nav-icon font-extrabold"></FaRegComments>
                      </button>

                      <button type="button" className="relative rounded-full">
                        <FaRegBell className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold"></FaRegBell>
                      </button>

                      <button
                        type="button"
                        className="relative rounded-full"
                        onClick={toggleFullScreen}
                      >
                        {isFullScreen ? (
                          <FaCompressArrowsAlt className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold" />
                        ) : (
                          <FaExpandArrowsAlt className="my-2 lg:mx-4 mx-3 h-5 w-5 nav-icon font-extrabold" />
                        )}
                      </button>

                      <button type="button" className="relative rounded-full">
                        <TbSettingsFilled
                          onClick={logout}
                          className="my-2 lg:ms-4 mx-3 h-6 w-6 nav-icon font-extrabold App-Setting"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <div className="component">{children}</div>
      </span>
    </div>
  );
};

export default Layout;
