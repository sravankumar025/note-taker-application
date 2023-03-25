import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();

    if (!data.email || !data.password || !data.confirmPassword) {
      alert("Kindly fill all the details");
    }
    if(data.password!==data.confirmPassword){
        alert("Password and confirm Password no match")
    }else{
        const config = {
            headers: {
              "content-type": "application/json",
            },
          };
          axios.post("http://localhost:5050/register", data, config)
          .then((res)=>{
              setData({});
              alert("Registration done kindly go and login");
              navigate('/');
          })
          .catch((e)=>{
              if(e.response.data.status==="failed"){
                  setErr("Email already exists")
              }
          })
    }
  };

  return (
    <div id="main-container" style={{ backgroundColor: "pink" }}>
      <div id="signin-container">
        <h4 style={{ fontSize: "40px" }}>SIGN UP</h4>
        <span style={{ color: "red", margin: "3px" }}>{err}</span>
        <form>
          <label>Email Address</label>
          <br />
          <input
            type="email"
            required="true"
            placeholder="Email"
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              },setErr(" "))
            }
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            required="true"
            placeholder="password"
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              },setErr(" "))
            }
          />
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            required="true"
            placeholder="password"
            onChange={(e) =>
              setData({
                ...data,
                confirmPassword: e.target.value,
              },setErr(" "))
            }
          />
          <br />
          <br />
          <input type="checkbox" />I aggree with{" "}
          <a href="www.google.com" target="_blank">
            Terms and Conditions
          </a>
          <br />
        </form>
        <button id="submit" onClick={handleClick}>
          Continue
        </button>
        <br />
        <br />
        <div></div>
      </div>
    </div>
  );
};
export default Register;
