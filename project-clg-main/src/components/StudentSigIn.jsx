import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const StudentSigIn = () => {
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const onhandleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const res = await axios.post(
        "http://localhost:8080/student/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(
        res.data.success
          ? "Login SuccessFull"
          : "Some Problem Ocurred! Try Again"
      );
      if (res.data.success === true) {
        setUser({
          userType: "Student",
          id: res.data.id,
        });
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="signin-form">
      <h1>Student Log In</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          required
          onChange={onhandleChange}
          name="userName"
          value={data.userName}
          placeholder="Enter Username"
        />
        <input
          type="password"
          required
          onChange={onhandleChange}
          name="password"
          value={data.password}
          placeholder="Enter Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentSigIn;
