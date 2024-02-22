import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';



export default function FoodCart(props) {
  let navigate = useNavigate(props)
  const postcart = async (foodName, price, quantity) => {
    try {
      const response = await fetch('http://localhost:5000/auth/setfoodcart', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ foodName, price, quantity })
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      if (data.status == 200) {
        props.makeAlert()
        
        setQuantity(1)
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  };


  const [quantity, setQuantity] = useState(1)
  const foodAddtocart = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('token')) {
      window.alert("Login to add food into the cart");
      navigate('/login');
      return;
    }

    postcart(props.name, props.price, quantity)

  }
  return (
    <div className='explore1'>

      <div className="foodExplore1">
        <div className="foodcard1">

          <img src={props.image} alt={props.name} />
          <h3>{props.name}</h3>
          <h5>Price-{props.price}</h5>
          <select id="Quantity" value={quantity} onChange={(e) => { setQuantity(parseInt(e.target.value)) }}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>



          <button type="button" className="btn btn-success w-50 mx-2 my-1" onClick={foodAddtocart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
