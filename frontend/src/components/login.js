import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { createSearchParams, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log("URL: ", process.env.REACT_APP_DEV_URL);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Username: ", username);
    // console.log("Prod URL: ", process.env.REACT_APP_BASE_URL);
    try {
      const prodUrl = `${process.env.REACT_APP_BASE_URL}/login?username=${username}`;

      const res = await axios.post(
        // prodUrl
        `http://localhost:10000/login?username=${username}`
      );

      const arrUsers = Object.values(res.data);
      console.log(
        "Username: ",
        arrUsers[0].username,
        "Password: ",
        arrUsers[0].password
      );

      if (
        arrUsers.length > 0 &&
        arrUsers[0].username === username &&
        arrUsers[0].pasword === password
      ) {
        navigate({
          pathname: "/services",
          search: createSearchParams({
            username: username,
            password: password,
            userid: arrUsers[0].userid,
          }).toString(),
        });
      } else {
        alert("Invalid credentials. Please try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <div className="imgcontainer">
          <img
            src={logo}
            className="logo-style"
            alt=""
            loading="lazy"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <div className="container">
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleClick}>
            Login
          </button>
        </div>
        <footer className="text-center mt-4">
          {/* Copyright and Links */}
          <p>&copy; 2023 University. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default Login;
