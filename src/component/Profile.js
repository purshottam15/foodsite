import React, { useState } from 'react'
import Order from './Order';

export default function Profile() {
 const[profile,setprofile]=useState([]) 
 const info=async()=>{
   
        let res = await fetch('http://localhost:5000/auth/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

            'auth-token': localStorage.getItem('token'),
          },
        });
  
        let data = await res.json();
        setprofile(data.name)
    
}
info()
  return (
    <>
    <div>
       
        <div className="profileContainer">
        <div className="profileMain"  >
          
          <h2 className="Profile_name">Hey........{profile}</h2>
          <button type="button" className="btn btn-success">
            Update profile
          </button>
      
        </div>
        </div>
        
    </div>
    
    <Order/>
    </>
  )
}
