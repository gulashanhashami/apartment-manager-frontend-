
 import axios from "axios";
 import { useState } from "react";
 import styled from "styled-components";
import { Link } from "react-router-dom";
  const ResultDiv1 = styled.div`
   .formdata1{
       width: 53%;
       height: auto;
       margin: auto;
       font-family:   sans-serif;
    }
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
       
  
   input{
       width: 48%;
       height: 4.6vh;
   }
   #btn{
       width: 24%;
       height: 6vh;
       color: white;
       font-weight: bold;
       background-color: green;
       border: 2px solid green;
   }
   #btn:hover{
   background-color: white;
   color: red;
   font-size: 2.2vh;
   }
   p{
       font-weight: bold;
       margin-right: 29%;
   }
  `;
export const AddData=()=>{
    const [formdata, setformData] =useState({"data_resid": []});


    const handleChange=(e)=>{
        const key=e.target.name;
       
    setformData({
        ...formdata,
        [key]:e.target.value,
    });
   }
         return (
             <ResultDiv1>
                  <div id="nav">
          <h4 className="edit">Apartment manager</h4>
          <Link to={"/"}>Return to Home</Link>
      <h4 className="edit">Add new flat data</h4>
      </div>
                 {/* <Link style={{"font-weight":"bold", "fontSize":"22px"}} to={"/"}>Go to home</Link> */}
           <div className="formdata1">
             
             <form onSubmit={(e)=>{
              e.preventDefault();
              axios.post("http://localhost:3001/data", formdata).then(()=>{
                  setformData({
                      no: "",
                      type: "",
                      block:"",
                      residents:"",
                      image:"",
                  })
              })
          }}>
            <p>Enter flat number</p>
            <input type="number" name="no" value={formdata.no} placeholder="Enter flat number" onChange={handleChange} />
            <p>Enter flat type</p>
            <input type="text" name="type" value={formdata.type}  placeholder="Enter flat type" onChange={handleChange} />
            <p>Enter flat block</p>
            <input type="text" name="block" value={formdata.block} placeholder="Enter flat block" onChange={handleChange} />
            <p> Number of residents</p>
            <input type="number" name="residents" value={formdata.residents} placeholder="Enter number of residents" onChange={handleChange} />
            <p>Enter flat image</p>
            <input type="text" name="image" value={formdata.image} placeholder="Enter flat image" onChange={handleChange} />
            <br />
            <br />
            <input id="btn" type="submit" value="Submit" />
            </form>      
        </div>
        </ResultDiv1>
    )
}