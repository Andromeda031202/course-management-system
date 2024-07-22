import React, { useState } from "react";
import StudentSignUp from "./StudentSignUp";
import TeacherSignUp from "./TeacherSignUp";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [activeUser, setActiveUser] = useState("Student");
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-upper-container">
        <ul>
          <li
            className={activeUser === "Student" ? "active-user" : ""}
            onClick={() => {
              setActiveUser("Student");
            }}
          >
            Student
          </li>
          <li
            className={activeUser === "Teacher" ? "active-user" : ""}
            onClick={() => {
              setActiveUser("Teacher");
            }}
          >
            Teacher
          </li>
        </ul>
      </div>
      <div className="signup-box">
        {activeUser === "Student" ? <StudentSignUp /> : <TeacherSignUp />}
      </div>
      <p>
        Already Registerd{" "}
        <span
          onClick={() => {
            navigate("/signin");
          }}
        >
          {" "}
          Log In
        </span>
      </p>
    </div>
  );
};

export default SignUp;
