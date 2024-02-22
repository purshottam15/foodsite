import React, { useEffect, useState } from 'react';

export default function Order() {
  const [food, setFood] = useState([]);

  const fetchOrder = async () => {
    try {
      let res = await fetch('http://localhost:5000/auth/userOrder', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });

      let data = await res.json();
      setFood(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
    
  }, []);
  const reverseArray=[...food].reverse();

  return (
    <div>
      <div className="container">
      { reverseArray.length>0&& <h1 className='my-4' style={{textAlign:"center"}}>Order</h1>}

        {reverseArray.map((data) => (
  <div key={data.date} className="card my-4">
    <div className="card-header">
      <h2 className="card-title">
        <button
          className="btn"
          type="button"
          data-bs-toggle="collapse"
          
          aria-expanded="true"
        >
          {data.date}
          <p className='my-2' style={{ color: "green",textDecoration:"none" }}>Status-{data.status}</p>
        </button>
      </h2>
    </div>
    <div
      id={`collapse_${data.date}`}
      className="collapse show"
    >
      <div className="card-body">
       
        <div>
          <table className="table table-hover my-0 table-sm">
            <thead  className="thead-dark fs-4 table_head ">
              <tr>
                <th className='table_head' scope="col">#</th>
                <th className='table_head' scope="col">Food Name</th>
                <th className='table_head' scope="col">Quantity</th>
                <th className='table_head' scope="col">Price</th>
                <th className='table_head' scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {data.foodItem.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.foodName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
))}

      </div>
    { !food.length>0&& <h1 className='my-4' style={{textAlign:"center"}}>No order</h1>}
    </div>
  );
}
