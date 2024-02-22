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

  const reverseArray = [...food].reverse();

  return (
    <div>
      <div className="container">
        

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
                  <p className='my-2 text-green-500'>Status-{data.status}</p>
                </button>
              </h2>
            </div>
          
              
                <div>
                  <table className="table-auto w-100 ">
                    <thead className="bg-gray-800 text-white text-lg">
                      <tr>
                        <th className='px-4 py-2'>#</th>
                        <th className='px-4 py-2'>Food Name</th>
                        <th className='px-4 py-2'>Quantity</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                      {data.foodItem.map((item, index) => (
                        <tr key={index}>
                          <td className='px-4 py-2'>{index + 1}</td> {/* Adjust index for static rows */}
                          <td className='px-4 py-2'>{item.foodName}</td>
                          <td className='px-4 py-2'>{item.quantity}</td>
                          <td className='px-4 py-2'>{item.price}</td>
                          <td className='px-4 py-2'>{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           
       
        ))}
      </div>
      {!food.length > 0 && <h1 className='my-4 text-center'>No order</h1>}
    </div>
  );
}
