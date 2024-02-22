import React, { useState } from 'react';



export default function Adminfoodcart(props) {
    console.log(props.id)
 const itemdelete=async()=>{
    let res = await fetch(`http://localhost:5000/auth/deletefood/${props.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            
        },
    });

    let response = await res.json();
    if(response.status==200){
        window.alert("Item deleted")
    }
 }   
 

 
  return (
    <div className='explore1'>
     
      <div className="foodExplore1">
        <div className="foodcard1">
          {/* Display the food item image */}
          <img src={props.image} alt={props.name} />

          {/* Display the food item name */}
          <h3>{props.name}</h3>

          {/* Display the food item price */}
         
          <h5>Price-{props.price}</h5>
          <button className='btn btn-danger' onClick={itemdelete}>Delete</button>
      

          

          
        </div>
      </div>
    </div>
  );
}
