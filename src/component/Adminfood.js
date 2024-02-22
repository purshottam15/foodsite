import React, { useEffect, useState } from 'react';
import Adminfoodcart from './AdminFoodCart';
import { Link } from 'react-router-dom';
export default function Adminfood() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const fetchFood = async () => {
        let res = await fetch('http://localhost:5000/auth/food', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        let data = await res.json();
        console.log(data);
        setCategories(data[1]); // Assuming data[0] contains categories
        setItems(data[0]); // Assuming data[1] contains food items
      };
    
      useEffect(() => {
        fetchFood();
      }, items);
    
  return (
    <div>
       
         <div className="container mainFood">
         <button  className='btn btn-success my-3' ><Link style={{color:"white",textDecoration:"none"}} to="/addfoodbyadmin12345">Add food</Link></button>
         <button  className='btn btn-success my-3 mx-2' ><Link style={{color:"white",textDecoration:"none"}} to="/Adminorder">View Order</Link></button>
        {categories.map((category) => (
          <div key={category._id}>
            <h3>{category.category}</h3>
            <hr />
            <div className="foodContainer" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>
            {items
              .filter((item) => item.category === category.category)
              .map((item) => (
               
  
                <Adminfoodcart
                  key={item._id}
                  id={item._id}
                  name={item.foodName}
                  price={item.price}
                  image={item.image}
                />
                
             
              ))}
               </div>
          </div>
        ))}
      </div>
    </div>
  )
}
