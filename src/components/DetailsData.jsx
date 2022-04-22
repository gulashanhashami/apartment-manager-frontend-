import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import {detailsDataLoading, detailsDataSuccess} from "../redux/actions";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ResultDiv = styled.div`
font-family:   Arial, sans-serif;

#nav{
    width: 100%;
    height: 5vh;
    padding-left:10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
    font-size: 3vh;
    align-items: center;
    background-color: black;
    /* border: 1px solid red; */
  }
.box{
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    margin:auto;
    margin-top:50px;
    width:90%;
    height:50vh;
    background-color: #284242;
     /* border:1px solid red; */
}
  .imgbox{
      width: 70%;
      height: 100%;
      /* border:1px solid red; */
  }
  .imgd{
  width: 100%;
  height: 100%;
}
.text{
    width: 28%;
      height: 100%; 
      text-align: left;
      font-weight: bold;
      color: white;
      /* border:1px solid red; */
}
#top{
    font-weight: bold;
    font-size: 6vh;
}
a{
  text-decoration: none;
  color: white;
}
a:hover{
  color: red;
}
table{
    margin: auto;
}
th, td{
    padding: 20px;
    border: 1px solid grey;
}
th{
    font-weight: bold;
    font-size: 3vh;
    border: 2px solid grey;
}
td{
  font-size: 2.5vh;
}
tr:hover{
  background-color: teal;
  font-weight: bold;
  color: white;
}
#btn1{
    color:white;
    padding: 1vh;
    background-color: blue;
    border:2px solid blue;
   
  }
#btn3{
    color:white;
    padding: 1vh;
    background-color: red;
    border:2px solid red;
   
  }
  .edit{
    color: white;
    margin-right: 20%;
  }
  .edit:hover{
    color: red;
  }
`;
export const DetailsData=()=>{
  
    const { loading, data, error } = useSelector((store) => store.data);  
    const dispatch = useDispatch();
   const [data1, setData1]= useState([])
    // const [Data, setData]=useState("");
    let { id } = useParams();
    // console.log(id);
    useEffect(()=>{
      getdata_pertcul();
    },[])

    const getdata_pertcul=()=>{
      dispatch(detailsDataLoading());
      axios.get(`http://localhost:3001/data/${id}`).then(({data})=>{
          // console.log(data)
          setData1(data)
          dispatch(detailsDataSuccess(data.data_resid));
        
      })
    }

    let handleRemove = (e) => {
      // console.log(e.resi_id)
      axios.delete(`http://localhost:3001/data/${e.resi_id}`)
          .then((res) => {
            // console.log(res)
            getdata_pertcul();
            
          
          })
          .catch((err) => {
             console.log(err);
          })
  }
   
// console.log(data)

return (
    <div>
      
        <ResultDiv> 
         
        <div id="nav">
          <Link to={"/"}><p>Return to home</p></Link>
          <h4 className="edit">Apartment manager</h4>
          </div>
       
    
            <div className="box">
                <div className="imgbox">
                <img className="imgd" src={data1.image} alt="" />
                </div>
           <div className="text">
           <p>Flat Number : {data1.no}</p>
            <p>Flat type : {data1.type}</p>
            <p>Flat Block : {data1.block}</p>
            <p>Number of residents : {data1.residents}</p>
           </div>
           
          </div>

          <div className="box1">
            <h1>Residents List</h1>
            <table className="table" border="1">
        <thead>
          <tr>
            {/* <th>Sr.No.</th> */}
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Belongs to flat</th>
            {/* <th>Edit</th>
            <th>Delete</th> */}
          </tr>
        </thead> 
        <tbody>
       
          {data.map((resident) => { 
            return (
               
              <tr key={resident.resi_id}>
                {/* <td>{resident.resi_no}</td> */}
                <td>{resident.name}</td>
                <td>{resident.gender}</td>
                <td>{resident.age}</td>
                <td>{resident.belongs}</td>
                {/* <td>
                <button className="bt" id="btn1" onClick={() => {
             
            }}><Link to={`/data/data_resid/${resident.resi_id}/edit`}>Edit</Link></button>
                </td>
                <td>
                <button className="bt" id="btn3" onClick={() => {
              handleRemove(resident)
        }}>Delete</button>
                </td> */}
              </tr>
             
            );
          })}
  
        </tbody>
      </table>
          </div>
      </ResultDiv>
    </div>
)
};
