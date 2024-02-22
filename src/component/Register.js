import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from './Alert';
import toast from 'react-hot-toast';

export default function Register() {
  // State-------------
  const [IsError, setIsError] = useState(false)
  const [alert, SetAlert] = useState(false)
  const [message, setMessage] = useState("")
  const [errorMessage, seterrorMessage] = useState("")
  const [user, setUser] = useState({ name: "", email: "", location: "", password: "" })
  // State end -------------
  const navigate = useNavigate()

  // Function==============
  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value })

  }
  const formSubmit = async (e) => {
    e.preventDefault();
    let { name, email, location, password } = user;

    let res = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, location, password })
    })
    let data = await res.json();
    if (data.status == 201) {
      setMessage("You are successfully registred")
     SetAlert(true);
     setTimeout(()=>{

       navigate('/login')
     },2000)
    }
    if (data.status == 400) {
      setIsError(true);
      seterrorMessage("User already exist...")

    }
    if (data.status == 501) {
      setIsError(true);
      seterrorMessage("Password must be between 4 to 10 character long")

    }


  }
  function loginHandler(){
     
    toast.error('This method not supported!',{
      duration:1000,
    })}
  return (
<div>
      {alert&&<Alert message={message} status="success"/>}
      <div className="flex  w-full max-w-sm mx-auto overflow-hidden mt-4 text-black bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
       {/* <form method='POST' onSubmit={formSubmit}> */}

        <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1615719413546-198b25453f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")'}}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            {/* <p>Foodie</p> */}
          </div>

          <p className="mt-3 text-xl text-center text-black dark:text-gray-200">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or Sign up with email</a>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

             <form method='POST' onSubmit={formSubmit}>
             <div className="mt-4">

<label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">Enter Name</label>
<input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" onChange={inputChange} name="name" />
</div>

          <div className="mt-4">

            <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" onChange={inputChange} name="email" />
          </div>
          <div className="mt-4">

            <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="LoggingEmailAddress">City</label>
            <input id="LoggingEmailAddress" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" onChange={inputChange} name="location" />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block mb-2 text-sm font-medium text-black dark:text-gray-200" htmlFor="loggingPassword">Password</label>
              <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
            </div>

            <input id="loggingPassword" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" name="password" onChange={inputChange} type="password" />
          </div>

          <div className="mt-6">
            <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign up!
            </button>
          </div>
            </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
           <Link to="/login"> <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or login</a>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span> </Link>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  )
}
