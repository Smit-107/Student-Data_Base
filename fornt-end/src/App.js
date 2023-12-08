import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Component/Login";
import Dashboard from "./Component/Dashboard";
import AddUser from "./Component/AddUser";
import AddContent from "./Component/AddContent";
import AddCourse from "./Component/AddCourse";
import AddStudent from "./Component/AddStudent";
import ViewUser from "./Component/ViewUser";
import ViewContent from "./Component/ViewContent";
import ViewCource from "./Component/ViewCource";
import ViewStudent from "./Component/ViewStudent";
import ProtectedRoute from "./Component/ProtectedRoute";
import CourseModel from "./Component/CourseModel";
import View from "./Component/View";
// import Edit from "./Component/Edit";

function App() {
  return (
    <div style={{ userSelect: "none" }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduser"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcontent"
          element={
            <ProtectedRoute>
              <AddContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcourse"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addstudent"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewuser"
          element={
            <ProtectedRoute>
              <ViewUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcontent"
          element={
            <ProtectedRoute>
              <ViewContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewcourse"
          element={
            <ProtectedRoute>
              <ViewCource />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewstudent"
          element={
            <ProtectedRoute>
              <ViewStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updatecourse"
          element={
            <ProtectedRoute>
              <CourseModel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewstudent"
          element={
            <ProtectedRoute>
              <ViewStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewstudent/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/editstudent/:id"
          element={
            <ProtectedRoute>
              <Edit />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
