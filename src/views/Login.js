import "./Login.css";
import { useState } from "react";
import { baseApi } from "../api/baseApi";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userLoginApi = baseApi + "user/login";

    axios
      .post(userLoginApi, {
        username: formData.username,
        password: formData.password,
      })
      .then((response) => {
        if (Array.isArray(response.data.username)) {
          setLoginMessage(response.data.username[0]);
        } else if (Array.isArray(response.data.password)) {
          setLoginMessage(response.data.password[0]);
        } else if (Array.isArray(response.data.error)) {
          setLoginMessage("Incorrect username or password");
        } else {
          setLoginMessage("");
          props.setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      {props.user && <Navigate to={"/"} />}
      <form onSubmit={handleSubmit}>
        {loginMessage && <h2>{loginMessage}</h2>}
        <input
          type="text"
          name="username"
          placeholder="User name"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Type password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
