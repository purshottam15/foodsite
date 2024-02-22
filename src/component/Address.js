import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function Address() {
  const navigate=useNavigate()
const[address,setAddress]=useState({name:"",mobileNo:"",area:"",city:""})
const inputChange=(e)=>{
  let name=e.target.name;
  let value=e.target.value;

  setAddress({...address,[name]:value})

}
const formSubmit=async(e)=>{
  e.preventDefault();
  let{name,mobileNo,area,city}=address;

  let res= await fetch('http://localhost:5000/auth/setAddress',{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      'auth-token':localStorage.getItem('token')

    },
    body:JSON.stringify({name,mobileNo,area,city})
  })
  let data= await res.json();
  if(data.status==200){
    
    navigate('/order/payment')
  }

}

  return (
    <div>
        <section class="vh-100 bg-image"
  style={{"background-image": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')"}}>
  <div class="mask d-flex align-items-center h-70 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-40">
        <div class="col-12 col-md-1 col-lg-7 col-xl-6">
          <div class="card" style={{"border-radius": "15px"}}>
            <div class="card-body p-3">
              <h2 class="text-uppercase text-center mb-2">Enter your detail</h2>

              <form  onSubmit={formSubmit}>

                <div class="form-outline mb-1">
                  <input type="text" onChange={inputChange} id="form3Example1cg" name='name' class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">Your Name</label>
                </div>

                <div class="form-outline mb-1">
                  <input type="number" onChange={inputChange} name='mobileNo' id="form3Example3cg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example3cg">Your MobileNo</label>
                </div>

                <div class="form-outline mb-1">
                  <input type="text" onChange={inputChange} id="form3Example4cg" class="form-control form-control-lg" name='area' />
                  <label class="form-label" for="form3Example4cg">Enter the area/locality</label>
                </div>

                <div class="form-outline mb-1">
                  <input type="text" onChange={inputChange} name='city' id="form3Example4cdg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example4cdg"> City</label>
                </div>

             

                <div class="d-flex justify-content-center">
                  <input type="submit"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" value="proceed"/>
                </div>



              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

