import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherSignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    initials: "",
    teacherId: "",
    email: "",
    phone: "",
    password: "",
  });

  const onhandleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const res = await axios.post("http://localhost:8080/teacher", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(
        res.data.success
          ? "Registration SuccessFull"
          : "Some Problem Ocurred! Try Again"
      );
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="signup-form">
      <h1>Teacher Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          required
          onChange={onhandleChange}
          value={data.userName}
          name="userName"
          placeholder="Enter a username"
        />
        <input
          type="text"
          required
          onChange={onhandleChange}
          value={data.initials}
          name="initials"
          placeholder="Enter a Initials"
        />
        <input
          type="text"
          required
          onChange={onhandleChange}
          value={data.teacherId}
          name="teacherId"
          placeholder="Enter a teacher Id"
        />
        <input
          type="email"
          required
          onChange={onhandleChange}
          value={data.email}
          name="email"
          placeholder="Enter a Email"
        />
        <input
          type="number"
          required
          onChange={onhandleChange}
          value={data.phone}
          name="phone"
          placeholder="Enter a Phone"
        />
        <input
          type="password"
          required
          onChange={onhandleChange}
          value={data.password}
          name="password"
          placeholder="Enter a Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TeacherSignUp;
