import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./noteDetails.css";
const NoteDetail = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/noteForm");
  };
  const { id } = useParams();
  useEffect(() => {
    if(localStorage.getItem("token")===null){
      alert("please Login first");
      navigate("/");

    }else{
      axios.get(`http://localhost:5050/getNotes/${id}`).then((res) => {
      setData(res.data.data[0]);
    });
    }
  }, []);
  const handleHome=()=>{
    navigate("/home")
  }
  const handleDelete=()=>{
    const confirm=window.confirm("are you sure want to delete?")
    if(confirm){
      axios.delete(`http://localhost:5050/delete/${id}`)
      navigate("/home")
    }
  }
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/')
  }
  return (
    <div id="noteDetails">
      <nav>
        <h4 onClick={handleHome} style={{ cursor: "pointer" }}> <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" height={20} width={20} style={{backgroundColor:"white",marginRight:"5px",marginLeft:"5px",borderRadius:"35px"}}/>Home</h4>
        <h4 onClick={handleAdd} style={{ cursor: "pointer" }}>
          + AddNote
        </h4>
        <h4 style={{ cursor: "pointer" }}>X DeleteAll</h4>
        <h4 style={{ cursor: "pointer" }}>Export</h4>
        <button style={{height:"55px",width:"80px",margin:"5px",backgroundColor:"red",color:"white",fontSize:"large"}} onClick={handleLogout}>Logout</button>
      </nav>
      <div id="tcontainer">
        <div id="tpart">
            {data.title}
        </div>
        <div id="dpart">
            {data.description}
        </div>
        <div>
        <button id="delete" onClick={handleDelete}>Delete</button>
        <button id="update">Update</button>
        </div>
      </div>
    </div>
  );
};
export default NoteDetail;
