import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    rollNumber: "",
    registrationNumber: "",
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
      const res = await axios.post("http://localhost:8080/student", data, {
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
      <h1>Student Register</h1>
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
          type="number"
          required
          onChange={onhandleChange}
          value={data.rollNumber}
          name="rollNumber"
          placeholder="Enter a Roll Number"
        />
        <input
          type="text"
          required
          onChange={onhandleChange}
          value={data.registrationNumber}
          name="registrationNumber"
          placeholder="Enter a register Number"
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

export default StudentSignUp;
