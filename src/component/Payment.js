import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedOption, setSelectedOption] = useState('cash');
  const[sum,setSum]=useState(0)

  const deleteFoodCart = async () => {
    try {
      let res = await fetch(`http://localhost:5000/auth/clearfoodcart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      let response = await res.json();
      // Handle the response here if needed
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  }

  const fetchAddress=async()=>{
    try {
      let res = await fetch('http://localhost:5000/auth/getAddresses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

    return await res.json();
    
    //  setUser(data)

    } catch (error) {
      console.error("Error fetching Address:", error);
    }
  

  }

  const postOrder = async (food, modeofpayment,address) => {
    try {
      let res = await fetch('http://localhost:5000/auth/giveorder', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({ food, modeofpayment,address }),
      });

      let data = await res.json();
      if (data.status === 200) {
        navigate('/order/success');
        setTimeout(() => {
          window.alert("Your order has been placed");
          navigate('/');
          deleteFoodCart();
        }, 2000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  const fetchCart = async () => {
    try {
      let res = await fetch('http://localhost:5000/auth/foodcart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      let data = await res.json();
      setFlag(true);
      setCart(data);

      // Calculate the sum using the reduce function
      const totalSum = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setSum(totalSum);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

 
  let index = 0;

  const orderPlaced = async() => {
    if (selectedOption === 'cash') {
   let user= await  fetchAddress();
      postOrder(cart, "cash",user);
    }
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className='container my-5 checkOutCart table-responsive table-responsive-sm table-responsive-md'>
        <h2 className='my-3' style={{ textAlign: "center", backgroundColor: "#414042", color: "white" }}>Payment</h2>

        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h1 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Address
              </button>
            </h1>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <h3>madhav maheshwari</h3>
                <h5>7067586806</h5>
                <span>fatka mohala,</span> <span>piplia</span>
              </div>
            </div>
          </div>
        </div>

        {cart.length > 0 ? (
          <table className='table table-hover my-0'>
            <thead className='text-success fs-4'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Food Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Price</th>
                <th scope='col'>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((data) => (
                <tr key={data.foodName}>
                  <td>{index += 1}</td>
                  <td>{data.foodName}</td>
                  <td>{data.quantity}</td>
                  <td>{data.price}</td>
                  <td>{data.quantity * data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 style={{ textAlign: "center" }}>Nothing in cart</h1>
        )}

        {cart.length > 0 && <h2 style={{ textAlign: "right" }}>Total-{sum.toFixed(2)}</h2>}

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentOption"
            id="flexRadioDefault1"
            value="cash"
            checked={selectedOption === 'cash'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Cash on delivery
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentOption"
            id="flexRadioDefault2"
            value="paypal"
            checked={selectedOption === 'paypal'}
            onChange={handleOptionChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Paypal
          </label>
        </div>

        <button disabled={cart.length <= 0} onClick={orderPlaced} className="btn btn-success">
          Order
        </button>
      </div>
    </div>
  );
}
