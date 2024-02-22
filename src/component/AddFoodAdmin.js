import React from 'react'
import { useState } from 'react';

export default function AddFoodAdmin() {
    const[food,setfood]=useState({foodName:"",category:"",price:0,image:""})
const inputChange=(e)=>{
  let name=e.target.name;
  let value=e.target.value;

  setfood({...food,[name]:value})

}
    const formSubmit=async(e)=>{
        e.preventDefault()
        let{foodName,category,price,image}=food;

  let res= await fetch('http://localhost:5000/auth/setfood',{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
      'auth-token':localStorage.getItem('token')
    },
    body:JSON.stringify({foodName,category,price,image})
  })
  let data= await res.json();
  if(data.status==200){
    window.alert("Data uploaded")
  }


    }
  return (
    <div className='container my-5'>
        <form >
  <div class="mb-3">
    
    <input type="text" placeholder='Foodname'  class="form-control" onChange={inputChange} name='foodName' id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div class="mb-3">
    
  <select class="form-select" name='category'  onChange={inputChange} aria-label="Default select example">
  <option selected>Choose category</option>
  <option value="Chinese">Chinese</option>
  <option value="Main-Course">Main-Course</option>
  <option value="dessert">desserts</option>
  <option value="Pizza">Pizza</option>
  
</select>
   
  </div>
  <div class="mb-3">
    
    <input type='number' placeholder='price' onChange={inputChange} class="form-control" name='price' id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
  <div class="mb-3">
    
    <textarea type="text" onChange={inputChange} placeholder='image' class="form-control" name='image' id="exampleInputEmail1" aria-describedby="emailHelp"/>
   
  </div>
 
  
  <button onClick={formSubmit} class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
