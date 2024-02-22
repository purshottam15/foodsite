import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function MobileNav(props) {
  
  
  const[Noitem,setItem]=useState()
  const[cart,setcart]=useState([])
  const Noofitem=async()=>{
    if(!localStorage.getItem('token')){
      return;

    }
    let res = await fetch('http://localhost:5000/auth/foodcart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        let data = await res.json();
        setcart(data)
        setItem(data.length)
        
  }
  const CartClick=()=>{

  }
  let navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  useEffect(()=>{
    Noofitem()
  },[cart])
  return (
    <div>
      <div className="navbar">
        <div className="logo" style={{marginRight:"-1rem"}}>
        <Link to="/" className='logoName' style={{textDecoration:"none",color:"#414042"}} > <h1 >Foodie</h1></Link>
        </div>
        <div className="items">
            <ul className="itemlist">
               
              
               
               {!localStorage.getItem('token')&& <li >
                 <Link  className='actualItem' to="/login"> Login</Link>
                   
                </li>}
                {!localStorage.getItem('token')&& <li >
                 <Link  className='actualItem' to="/signup"> SignUp</Link>
                   
                </li>}
                {localStorage.getItem('token')&& <li  onClick={CartClick}><Link className='btn btn-danger' to="/cart" style={{width:"5rem",fontSize:"0.9rem",marginLeft:"3rem"}}>Cart <span class="badge badge-light">{Noitem}</span></Link>
              
                   
              </li>}
               
               {localStorage.getItem('token')&& <li class="nav-item dropdown actualItem">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-user"></i>
          </a>
          <ul class="dropdown-menu">
          <li >
                 <Link className='dropdown-item my-2 mx-2 ' to="/food"> Food</Link>
                
                   
                </li>
                <hr/>
          <Link className='dropdown-item my-2 mx-2 '  to="/profile">Profile</Link>
          <hr/>
          <li>
                 <Link   className='dropdown-item my-2 mx-2' to="/user/order"> Order</Link>
                   
                </li>
                <hr/>
          {localStorage.getItem('token')&& <li className='dropdown-item my-2 mx-2 ' onClick={logout} to="/login">logout
              
                   
              </li>}
          </ul>
        </li>
}
            </ul>
        </div>
      </div>
    </div>
  )
}
