import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Course = () => {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);
  const [studentEnrolled, setStudentEnrolled] = useState([]);
  console.log(studentEnrolled);

  const enrollCourse = async ({
    teacherId,
    courseId,
    studentId,
    subjectName,
  }) => {
    const res = await axios.post("http://localhost:8080/enroll", {
      teacherId: teacherId,
      courseId: courseId,
      studentId: studentId,
      subjectName: subjectName,
    });

    alert(
      res.data.success
        ? "Enrolled SuccessFull"
        : "Some Problem Ocurred! Try Again"
    );
  };

  const getAllCourse = async () => {
    const res = await axios.get("http://localhost:8080/course");
    setCourse([...res.data.courses]);
  };

  const getAllStudentEnroll = async () => {
    const res = await axios.get(
      `http://localhost:8080/enroll/allenrollbystudent/${user.id}`
    );
    setStudentEnrolled([...res.data.enroll]);
  };
  const deleteCourse = async (courseId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/course/${courseId}`
      );
      if (res.data.success) {
        alert("Course deleted successfully");
        getAllCourse(); // Refresh the course list
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  useEffect(() => {
    getAllCourse();
    if (user.userType === "Student") getAllStudentEnroll();
  }, []);

  const handleLogout = () => {
    clearUser();
    navigate("/signin");
  };

  return (
    <div className="course-container">
      <h1>Courses</h1>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      {user.userType === "Admin" ? (
        <button
          className="add-course-btn"
          onClick={() => {
            navigate("/addcourse");
          }}
        >
          Add Course
        </button>
      ) : null}
      {user.userRole !== "Teacher" ? (
        <>
          <h1>All Courses</h1>
          <div className="all-course-container">
            {course?.length === 0
              ? null
              : course?.map((cor, i) => (
                  <div className="course-container violet-box">
                    <h2>{cor.subjectCode}</h2>
                    <p>{cor.subjectName}</p>
                    <p>{cor.courseSyllabus}</p>
                    {user.userType === "Student" ? (
                      <button
                        onClick={() => {
                          enrollCourse({
                            teacherId: cor.teacherId,
                            studentId: user.id,
                            courseId: cor._id,
                            subjectName: cor.subjectName,
                          });
                        }}
                        className="enroll-btn"
                      >
                        Enroll Now
                      </button>
                    ) : null}
                    {user.userType === "Admin" ? (
                      <button
                        onClick={() => deleteCourse(cor._id)}
                        className="delete-btn"
                      >
                        Delete Course
                      </button>
                    ) : null}
                  </div>
                ))}
          </div>
        </>
      ) : null}
      {user.userType === "Student" ? <h2>Enrolled Courses</h2> : null}
      <div className="enrolled-courses">
        {user.userType === "Student" && studentEnrolled?.length !== 0
          ? studentEnrolled?.map((en) => (
              <div className="course-container green-box">
                <h2>{en.subjectName}</h2>
                <p>{en.teacherId}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Course;
