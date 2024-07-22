import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [data, setData] = useState({
    teacherId: "",
    subjectCode: "",
    subjectName: "",
    courseSyllabus: "",
  });
  const [teacher, setTeacher] = useState([]);
  const navigate = useNavigate();

  const getAllTeachers = async () => {
    const res = await axios.get("http://localhost:8080/teacher");
    setTeacher([...res.data.teacher]);
  };

  const onhandleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/course", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(
        res.data.success
          ? "Course Added SuccessFull"
          : "Some Problem Ocurred! Try Again"
      );
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  return (
    <div className="addcourse-container">
      <div className="addcourse-form">
        <h1>Add Course</h1>
        <form onSubmit={onSubmit}>
          <select
            name="teacherId"
            required
            onChange={onhandleChange}
            id="teacherId"
          >
            <option defaultValue="Select">Select teacher</option>
            {teacher?.length === 0
              ? null
              : teacher?.map((teac, i) => (
                  <option key={i} value={teac.id}>
                    {teac.userName}
                  </option>
                ))}
          </select>
          <input
            type="text"
            required
            onChange={onhandleChange}
            value={data.subjectCode}
            name="subjectCode"
            placeholder="Enter a subject Code"
          />
          <input
            type="text"
            required
            onChange={onhandleChange}
            value={data.subjectName}
            name="subjectName"
            placeholder="Enter a subject Name"
          />
          <input
            type="text"
            required
            onChange={onhandleChange}
            value={data.courseSyllabus}
            name="courseSyllabus"
            placeholder="Enter a courseSyllabus"
          />
          <button type="submit">Save Course</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
