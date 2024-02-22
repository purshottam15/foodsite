import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {
  
  
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
      <div className="navbar ">
        <div className="logo">
        <Link to="/" className='logoName' style={{textDecoration:"none",color:"#414042"}} > <h1 >Foodie</h1></Link>
        </div>
        <div className="items">
            <ul className="itemlist">
               <li ><Link className='actualItem' to="/"> Home</Link></li>
                <li >
                 <Link className='actualItem' to="/food"> Food</Link>
                   
                </li>
               
               {!localStorage.getItem('token')&& <li >
                 <Link  className='actualItem' to="/login"> Login</Link>
                   
                </li>}
                {!localStorage.getItem('token')&& <li >
                 <Link  className='actualItem' to="/signup"> SignUp</Link>
                   
                </li>}
                {localStorage.getItem('token')&& <li  onClick={CartClick}><Link className='btn btn-danger' to="/cart">Cart <span class="badge badge-light">{Noitem}</span></Link>
              
                   
              </li>}
               
               {localStorage.getItem('token')&& <li class="nav-item dropdown actualItem">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-user"></i>
          </a>
          <ul class="dropdown-menu">
          <Link className='dropdown-item '  to="/profile">Profile</Link>
          <li>
                 <Link   className='dropdown-item' to="/user/order"> Order</Link>
                   
                </li>
          {localStorage.getItem('token')&& <li className='dropdown-item ' onClick={logout} to="/login">logout
              
                   
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
