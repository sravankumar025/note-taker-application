import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [data, setData] = useState({});
  const [err,setErr]=useState("");
  const navigate=useNavigate();
  const handleClick=(e)=>{
    e.preventDefault();

    if(!data.email || !data.password){
        alert("Kindly fill all the details");
    }
    const config={
        headers:{
            "content-type":"application/json",
        },
    };
    axios.post("http://localhost:5050/login",data,config)
    .then((res)=>{
        localStorage.setItem("token",res.data.jwt_token);
        if(res.data.jwt_token!==undefined){
            navigate("/home")
        }
        if(res.data.status==="failed"){
            setErr("email doest not exists kindly register");
        }
    }).catch((e)=>{
        if(e.response.data.status==="fail"){
            setErr("Password is incorrect");
        }
    })
  }
  const handleRegister=()=>{
    navigate("/register")
  }
  return (
    <div id="main-container">
      <div id="signin-container">
        <h4 style={{ fontSize: "40px" }}>SignIn</h4>
        <span style={{color:"red",margin:"3px"}}>{err}</span>
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
          <br />
          <input type="checkbox" />
          Remember Me
          <br />
        </form>
        <button id="submit" onClick={handleClick} >Submit</button>
          <br />
          <br />
          <div>
          <span style={{margin:"10px",color:"blue",cursor:"pointer"}} onClick={handleRegister}>Register</span>
          <span style={{ marginLeft: "140px" }}>Forgot Password</span>
          </div>
      </div>
    </div>
  );
};
export default Login;
