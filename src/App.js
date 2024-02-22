import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import Login from './component/Login';
import Register from './component/Register';
import Food from './component/Food';

import CheckOutCart from './component/CheckOutCart';
import Adminfood from './component/Adminfood';
import AddFoodAdmin from './component/AddFoodAdmin';
import Address from './component/Address';
import Payment from './component/Payment';
import OrderSuccess from './component/OrderSuccess';
import Order from './component/Order';
import Profile from './component/Profile';
import AdminOrder from './component/AdminOrder';
import { useEffect, useState } from 'react';
import MobileNav from './component/MobileNav';
import Footer from './component/Footer';


function App() {
  const[IsMobile,setIsMobile]=useState(window.innerWidth<600)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);







  // getting profile Info 
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
 useEffect(()=>{
 info();
 },[])
  
 
  return (
  
    <div className="App">
     
        <Router>
    {IsMobile?<MobileNav/>:<Navbar />} 
    
     <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route exact path="/signup" element={<Register/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/food" IsMobile={IsMobile} element={<Food/>}  />
            <Route exact path="/cart" element={<CheckOutCart />} />
            <Route exact path="/adminfood" element={<Adminfood/>} />
            <Route exact path="/addfoodbyadmin12345" element={<AddFoodAdmin/>} />
            <Route exact path="/addaddress" element={<Address/>} />
            <Route exact path="/order/payment" element={<Payment/>} />
            <Route exact path="/order/success" element={<OrderSuccess/>} />
            <Route exact path="/user/order" element={<Order/>} />
            <Route exact path="/profile" element={<Profile Profile={profile}/>} />
            <Route exact path="/Adminorder" element={<AdminOrder/>} />

           

          </Routes>
          <Footer/>
     </Router>
    
    </div>
  
  );
}

export default App;
