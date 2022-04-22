import axios from "axios";
 import { useState } from "react";
 import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
 const ResultDiv = styled.div`
 font-family: sans-serif;
 #nav{
    width: 100%;
    height: 5vh;
    padding-left:10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
    font-size: 3vh;
    color: white;
    align-items: center;
    background-color: black;
    /* border: 1px solid red; */
  }
 input{
       width: 25%;     
    height: 4.6vh;
 }
 p{
       font-weight: bold;
       margin-right: 18%;
 }
   .edit{
    margin-right: 20%;
  }
  a{
    margin-right: 13%;
    text-decoration: none;
    color: white;
  }
  a:hover{
    color: red;
  }
  .edit:hover{
  color: red;
  }
   #btn{
       width: 10%;
       height: 6vh;
       color: white;
       font-weight: bold;
       border-radius: 3px;
       background-color: green;
       border: 2px solid green;
   }
   #btn:hover{
   background-color: white;
   color: red;
   font-size: 2.2vh;
   }
 `;
export const Signin=()=>{
  const [sign_data, setSdata]= useState({});
  const [status, setStatus]= useState(true);
let navigate=useNavigate();

  const handleChange=(e)=>{
    var key=e.target.name;
    setSdata({
      ...sign_data,
      [key]:e.target.value
    })
  }
    return (
        <div>
           <ResultDiv> 
           <div id="nav">
          <h4 className="edit">Signin page</h4>
          <Link to={"/signup"}>Create an account</Link>
      <h4 className="edit">Apartment manager</h4>
      </div>
        <form onSubmit={(e)=>{
           e.preventDefault();
           axios.post(`http://localhost:2345/login`, sign_data).then(({data})=>{
             console.log(data.error)
             if(data.error===false){
               alert("Login successfully")
              navigate("/")
            }else{
              alert("Please enter same email and password")
            }
           })
          //  if(status===false){
          //    navigate("/")
          //  }
        }}>
            <p>Enter email</p>
            <input type="email" name="email" value={sign_data.email}  placeholder="Enter email" onChange={handleChange} />
            <p>Enter password</p>
            <input type="password" name="password" value={sign_data.password} placeholder="Enter a password" onChange={handleChange} />
            <br />
            <br />
            <input id="btn" type="submit" value="Login" />
        </form>
        </ResultDiv>
        </div>
    )
}