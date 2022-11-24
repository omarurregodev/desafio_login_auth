import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data:response } = await axios.post(
        "http://localhost:8000/api/login",
        { username }, // falta agregar password {username, password}
        {
          withCredentials: true
        }
      );
      console.log(response);
      if (response.status === "success") {
        navigate('/home');
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      {/* <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input> */}
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
