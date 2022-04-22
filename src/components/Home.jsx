
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import {
    getDataLoading,
    getDataSuccess,
  } from "../redux/actions";
  import axios from "axios";

  import styled from "styled-components";

  const ResultDiv = styled.div`
  font-family: sans-serif;
  #searchbar{
  width: 100%;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 7%;
    margin-top: 1vh;
    align-items: center;
   
    background-color:rgba(249, 249, 249, 256) ;
    /* border: 1px solid red; */
}
#sbox{
  font-weight: bold;
  font-size: 2vh;
  width: 87%;
  height: 3.5vh;
  outline-style: none;
  padding-left: 1.2vh;
  /* border-radius: 3px; */
}
#filter{
  width: 20%;
  font-weight: bold;
  font-size: 2vh;
  height: 3.5vh;
  margin-right: 15%;
  border-radius: 3px;
}
#sort{
  width: 20%;
  font-weight: bold;
  font-size: 2vh;
  height: 3.5vh;
  border-radius: 3px;
}
  #nav{
    width: 100%;
    height: 5vh;
    padding-left:7%;
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
  
  table{
      margin: auto;
      margin-top: 5vh;
  }
  th, td{
    padding: 10px;
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

  a{
    text-decoration: none;
    color:white;
  }
  a:hover{
    color: red;
  }
  
h4:hover{
  color:red;
}
.rt{
  margin-left: 100px;
}
.img1{
  width: 50vh;
  height: 20vh;
}
.pagebtn{
  width: 10vh;
  height: 6vh;
  margin-left:5vh;
  color: white;
  font-size: 1.8vh;
  font-weight: bold;
  background-color: blue;
  border: 2px solid blue;
}
.pagebtn:hover{
  background-color: white;
  color: red;
}
.sign{
  /* float: right; */
  margin-right: 15%;
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
  #btn3:hover{
    background-color: #310202;
  }
  #sbarbox{
    width: 40%;
    display: flex;
    flex-direction: row;
    /* border:2px solid red; */
  }
  #sbtn{
    color: white;
    font-weight: bold;
    background-color: black;
  }
  #sbtn:hover{
    background-color: #09fd09;
  }
`;

  export const Home = () => {
    const [page, setPage]= useState(1);
    const { loading, data, error } = useSelector((store) => store.data); 
    const dispatch = useDispatch();
    useEffect(() => {
      getDatas();
    }, [page]);

    const getDatas = () => {
      
        dispatch(getDataLoading());
        axios.get(`http://localhost:3001/data?_page=${page}&_limit=3`).then(({ data }) => {
          dispatch(getDataSuccess(data));
        });
      };
// console.log(data)
      let handleRemove = (e) => {
        axios.delete(`http://localhost:3001/data/${e.id}`)
            .then((res) => {
              getDatas()
            
            })
            .catch((err) => {
               console.log(err);
            })
    }
    function result(e){
      if(e.target.value==="low"){
        var arr1=data.sort((a,b)=>a.no-b.no)
        dispatch(getDataSuccess(arr1));
        //  console.log(arr1)
      }else{
        var arr2=data.sort((a,b)=>b.no-a.no)
        dispatch(getDataSuccess(arr2));
        // console.log(arr2)
      }
    }

    function result1(e){
      if(e.target.value==="owner"){
       var arr3=data.filter(e=>e.type==="Owner");
       dispatch(getDataSuccess(arr3));
        //  console.log(arr3)
      }else{
        var arr4=data.filter(e=>e.type==="Tenant")
        dispatch(getDataSuccess(arr4));
        // console.log(arr4)
      }
    }

    function handleSearch(e){
      if(e.target.value==="A"){
       var arr5=data.filter(e=>e.block==="B");
       dispatch(getDataSuccess(arr5));
        //  console.log(arr3)
      }else{
        var arr6=data.filter(e=>e.block==="A")
        dispatch(getDataSuccess(arr6));
        // console.log(arr4)
      }
    }
   
    function handleChange(e){
     var key=e.target.value;
    //  console.log(key)
     return key;
     
    }
    // var key_data=handleChange;
    // console.log(handleChange)
    // function handleSearch(e){
    //     var key_data=e.target.value;
    //     dispatch(getDataLoading());
    //     axios.get(`http://localhost:3001/data?_page=${page}&_limit=3&s=${key_data}`).then(({ data }) => {
    //       dispatch(getDataSuccess(data));
    //       // console.log(key_data)
    //     });
    // }
     
      return (
        <div>
         <ResultDiv>
         
         <div id="nav">
          Home Page
        
            <Link to={"/data"}><h4>Add new flat data</h4></Link>
          <h4>Flat List</h4>
          <div className="sign">
          <Link to={"/signup"}>SignUp</Link>
          </div>
          </div>
          <div id="searchbar">
            <div id="sbarbox">
            <input id="sbox" onChange={handleChange} type="text" placeholder="Search by block name" />
            <button id="sbtn" onClick={handleSearch}>Search</button>
            </div>
            <select onChange={
             result

            } name="" id="sort">
              <option value="">Sort by flat No.</option>
              <option value="low">Low to high</option>
              <option value="high">High to low</option>
            </select>

            <select onChange={result1} name="" id="filter">
              <option value="">Filter by flat type</option>
              <option value="owner">Owner</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
         
          <div className="box1">
            
            <table className="table" border="1">
        <thead>
          <tr>
            <th>Flat No.</th>
            <th>Flat type</th>
            <th>Flat block</th>
            <th>No. of residents</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Image of flat</th>
          </tr>
        </thead> 
        <tbody>
       
          {data.map((flat) => { 
            return (
               
              <tr key={flat.id}>
                <td>{flat.no}</td>
                <td>{flat.type}</td>
                <td>{flat.block}</td>
                <td>{flat.residents}</td>
                <td>
                <button className="bt" id="btn1" onClick={() => {
             
            }}><Link to={`/data/${flat.id}/edit`}>Edit</Link></button>
                </td>
                <td>
                <button className="bt" id="btn3" onClick={() => {
              handleRemove(flat)
        }}>Delete</button>
                </td>
                <td>
                <Link to={`/data/${flat.id}/detail`}>
                  <img className="img1" src={flat.image} alt="" />
                  </Link>
                </td>
               
              </tr>
             
            );
          })}
  
        </tbody>
      </table>
          </div>
          <button className="pagebtn"
        onClick={() => {
       setPage(page-1);
        }}
      >
        Prev
      </button>

      <button className="pagebtn"
        onClick={() => {
      setPage(page+1);
        }}
      >
        Next
      </button>
          </ResultDiv>
        </div>
      );
    };