import { isDisabled } from '@testing-library/user-event/dist/utils';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function CheckOutCart(props) {
    const [cart, setcart] = useState([]);
    const [flag, setflag] = useState(false);
    let sum = 0;
    let index = 0;
    const deletefood = async (id) => {
        try {
            let res = await fetch(`http://localhost:5000/auth/deletefoodcart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });

            let response = await res.json();
        } catch (error) {
            console.log(error)
        }

    }

    const fetchCart = async () => {
        try {


            let res = await fetch('http://localhost:5000/auth/foodcart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });

            let data = await res.json();
            setflag(true)

            setcart(data)
            cart.map((data) => {
                sum += data.price * data.quantity
            })
        } catch (error) {
            console.log(error)
        }



    }


    const quantityChange = async (newQuantity, id) => {

        let res = await fetch(`http://localhost:5000/auth/updatefoodcart/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')


            },
            body: JSON.stringify({ quantity: newQuantity })
        })
        let data = await res.json();

    }
    useEffect(() => {
        fetchCart()
    }, cart)
    cart.map((data) => {
        sum += data.price * data.quantity
    })



    return (
        <div className='container 
       my-5 checkOutCart cart_container' >
            <h2 className='my-3' style={{ textAlign: "center", backgroundColor: "#414042", color: "white" }}>Your cart</h2>
            {cart.length > 0 ? <table className='table table-hover table-sm table-responsive table-responsive-sm table-responsive-md'>
                <thead className='text-success fs-4'>
                    <tr>
                        <th className='table_head' scope='col'>#</th>
                        <th className='table_head' scope='col'>Food Name</th>
                        <th className='table_head' scope='col'>Quantity</th>
                        <th className='table_head' scope='col'>Price</th>
                        <th className='table_head' scope='col' >Total Price</th>

                    </tr>
                </thead>
                <tbody>
                    {


                        cart.map((data) => {

                            return (
                                <tr>
                                    <td>{index += 1}</td>
                                    <td>{data.foodName}</td>
                                    <td>  <select id="Quantity" value={data.quantity} onChange={(e) => { quantityChange(e.target.value, data._id) }}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select> </td>
                                    <td>{data.price}</td>
                                    <td>{data.quantity * data.price}</td>
                                    <td onClick={() => { deletefood(data._id) }}><i class="fa-solid fa-trash"></i></td>
                                </tr>



                            )




                        })
                    }

                </tbody>





            </table> : <h1 style={{ textAlign: "center" }}>Nothing in cart</h1>}
            {cart.length > 0 && <h2 style={{ textAlign: "right" }}>Total-{sum.toFixed(2)}</h2>}
            <button disabled={cart.length <= 0} className='btn btn-success'><Link to="/addaddress" style={{ color: "white", textDecoration: "none" }}>CheckOut</Link></button>

        </div>
    )
}
