import React, { useEffect, useState } from 'react';


export default function AdminOrder() {
    const [food, setFood] = useState([]);
    const [userId, setUserid] = useState();
const OrderComplete=async(e,id)=>{
   e.preventDefault()
    try {
        let res = await fetch(`http://localhost:5000/auth/updateOrderStatus/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
               
            },
            body: JSON.stringify({ newStatus:"complete" }),

        });
        let data = await res.json();
        console.log(data)

      

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}
    

    const fetchOrder = async () => {
        try {
            let res = await fetch('http://localhost:5000/auth/allUserOrders', {
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

    },[food]);
    const reverseArray = [...food].reverse();
    

    return (
        <div>
           
            <div className="container">
            
                {reverseArray.length > 0 && <h1 className='my-4' style={{ textAlign: "center" }}>Order</h1>}

                {reverseArray.map((data) => (
                    <div key={data._id} className="card my-4">
                        <div className="card-header " style={{ display: "flex", justifyContent: "space-between" }}>
                            <p className="card-title">
                                <div



                                    aria-expanded="true"
                                >
                                    {data.date}
                                    <p className='my-2' style={{ color: "green", textDecoration: "none" }}>Status-{data.status}</p>
                                    <button className='btn btn-primary' onClick={(e)=>{OrderComplete(e,data._id)}}>Mark as complete</button>
                                </div>




                            </p>
                            {data.address.map((info) => (
                                <div>
                                    <h4 style={{ color: "red" }}>User Info</h4>

                                    <p className='my-1'>Name-{info.name}</p>
                                    <p className='my-1'>MobileNo-{info.mobileNo}</p>
                                    <p className='my-1'>Address-{info.area},{info.city}</p>
                                </div>
                            ))}


                        </div>
                        <div
                            id={`collapse_${data.date}`}
                            className="collapse show"
                        >
                            <div className="card-body">

                                <div>
                                    <table className="table table-hover my-0">
                                        <thead className="text-success">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Food Name</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Total Price</th>
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
            {!food.length > 0 && <h1 className='my-4' style={{ textAlign: "center" }}>No order</h1>}
        </div>
    );
}
