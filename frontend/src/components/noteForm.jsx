import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./noteForm.css";
const NoteForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleHome=()=>{
    navigate("/home")
  }
  const handleClick = () => {
    if (!data.title || !data.description) {
      alert("kindly fill all the fields");
    } else {
        console.log(data);
        const config={
            headers:{
                "content-type":"application/json",
            },
        };
        if(localStorage.getItem("token")===null){
          alert("please login first");
          navigate("/");
        }else{
          axios.post("http://localhost:5050/createNotes",data,config).then((res)=>{
            navigate("/home")
        })
        }
    }
  };
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/')
  }
  
  return (
    <div style={{backgroundColor:"skyblue",height:"100vh"}}>
      <nav>
        <h4 onClick={handleHome} style={{ cursor: "pointer" }}> <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" height={20} width={20} style={{backgroundColor:"white",marginRight:"5px",marginLeft:"5px",borderRadius:"35px"}}/>Home</h4>
        <h4 style={{ cursor: "pointer" }}>+ AddNote</h4>
        <h4 style={{ cursor: "pointer" }}>X DeleteAll</h4>
        <h4 style={{ cursor: "pointer" }}>Export</h4>
        <button style={{height:"55px",width:"80px",margin:"5px",backgroundColor:"red",color:"white",fontSize:"large"}} onClick={handleLogout}>Logout</button>
      </nav>
      <div id="form">
        <form>
          <label>Title</label>
          <br />
          <br />
          <input type="text" id="text1" onChange={(e) =>
              setData({
                ...data,
                title: e.target.value,
              })
            } />
          <br />
          <br />
          <label>Description</label>
          <br />
          <br />
          <textarea type="text" id="text2" onChange={(e) =>
              setData({
                ...data,
                description: e.target.value,
              })
            } ></textarea>
          <br />
        </form>
        <button id="addNote" onClick={handleClick}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
