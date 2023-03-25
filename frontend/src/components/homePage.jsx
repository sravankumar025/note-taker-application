import React, { useEffect, useState } from "react";
import "./homePage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const [data, setData] = useState([]);
  const [search, searchTerm] = useState("");
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/noteForm");
  };
  const deletAllnotes=()=>{
    axios.delete("http://localhost:5050/deleteAll").then((res)=>{
        console.log(res.data);
    })
  }
  useEffect(() => {
    if(localStorage.getItem("token")===null){
        alert('please Login First and go');
        navigate('/');
    }else{
        axios.get("http://localhost:5050/getNotes").then((res) => {
      setData(res.data.data);
    });
    }
  }, []);
 
  const result = !search
    ? data
    : data.filter((each) =>
        each.title.toLowerCase().includes(search.toLowerCase())
      );
      const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate("/")
      }
  return (
    <div>
      <nav>
        <h4> <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" height={20} width={20} style={{backgroundColor:"white",marginRight:"5px",marginLeft:"5px",borderRadius:"35px"}}/>Home</h4>
        <h4 onClick={handleAdd} style={{ cursor: "pointer" }}>
          + AddNote
        </h4>
        <h4 style={{ cursor: "pointer" }}onClick={deletAllnotes}>X DeleteAll</h4>
        <h4 style={{ cursor: "pointer" }}>Export</h4>
        <button style={{height:"55px",width:"80px",margin:"5px",backgroundColor:"red",color:"white",fontSize:"large"}} onClick={handleLogout}>Logout</button>
      </nav>
      <div>
       
        <input
          id="searchNote"
          type="text"
          placeholder="search note"
          onChange={(e) => {
            searchTerm(e.target.value);
          }}
          
        />
        <i class="fa-solid fa-magnifying-glass" style={{position:"absolute",top:"100px",left:"1400px"}}></i>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {result.map((item, index) => {
             const dateString=item.createdAt;
             const date=new Date(dateString);
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/noteForm/${item._id}`}
              >
                <div id="container" key={index}>
                  <div id="sub-cont-1">
                    <img src="https://www.freeiconspng.com/thumbs/timer-icon/timer-icon-15.png" height={20} width={20} style={{marginRight:"8px"}}/>
                    <b>{date.getDate()+" "+date.getDay()+" "+date.getFullYear()}    {date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()} {(date.getHours()>12?'PM':'AM')}</b>
                  </div>
                  <div id="sub-cont-2">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr-DUQs8PNTNh0Bu5991fqARgEUvatcAOKUugMmGNi6Q&usqp=CAU&ec=48665701" height={20} width={20} style={{borderRadius:"5px",marginRight:"5px"}}
                  />
                    <b>{item.title}</b>
                  </div>
                  <div id="sub-cont-3">{item.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default HomePage;