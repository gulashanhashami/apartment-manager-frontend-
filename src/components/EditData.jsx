import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { editDataLoading, editDataSuccess } from "../redux/actions";
import styled from "styled-components";

  const ResultDiv = styled.div`
  font-family:   sans-serif;
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
  form{
    margin-top: 7%;
  }
  .in{
    width: 22%;
    height: 4vh;
  }
  #btn{
width: 7%;
height: 4vh;
color: white;
font-weight: bold;
border-radius: 3px;
background-color: red;
border: 2px solid red;
  }
  #btn:hover{
    background-color: #690303;
  }
  `;
export const EditDatas=()=>{
    const { loading } = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
    let { id } = useParams();
    useEffect(()=>{
    axios.get(`http://localhost:3001/data/${id}`).then((data)=>{
      // console.log(data)
       setData(data.data);
    })
    },[])

    function handleChange(e) {
        let key = e.target.name;
        let inputData = {};
        if (key != "check") {

          inputData = {
            ...newData,
            [key]:e.target.value,
          };
        } else {
          inputData = {
            ...newData,
            [key]:e.target.value,
          };
        }
    
        setNewData(inputData);
      }

      function handleSave(e) {
       e.preventDefault();
        dispatch(editDataLoading());
        axios({
          method: "patch",
          url: `http://localhost:3001/data/${id}`,
          data: {
            id: data.id,
            no: newData.no || data.no,
            type: newData.type || data.type,
            block: newData.block || data.block,
            residents: newData.residents || data.residents,
            image: newData.image || data.image,
          },
        }).then((res) => {
          dispatch(editDataSuccess());
          
        });
      }
return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <ResultDiv>
      <div id="nav">
          <h4 className="edit">Edit Page</h4>
          <Link to={"/"}>Return to Home</Link>
      <h4 className="edit">Apartment manager</h4>
      </div>
      <form onSubmit={handleSave}>
      <input className="in" type="number" name="no" defaultValue={data.no} placeholder="no" onChange={handleChange} />
      <br />
         <input className="in" type="text" name="type" defaultValue={data.type}  placeholder="type" onChange={handleChange} />
         <br />
         <input className="in" type="text" name="block" defaultValue={data.block} placeholder="block" onChange={handleChange} />
         <br />
         <input className="in" type="number" name="residents" defaultValue={data.residents} placeholder="residents" onChange={handleChange} />
         <br />
         <input className="in" type="text" name="image" defaultValue={data.image} placeholder="image" onChange={handleChange} />
         <br />
         <br />
         <input id="btn" type="submit" value="Save" />
      
      <input type="checkbox" id="check" onChange={handleChange} name="check" />
      <label htmlFor="check">Completed</label>
      </form>
      </ResultDiv>
    </div>
  );
};