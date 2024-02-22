import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register() {
  // All state of componet

  const navigate = useNavigate()
  const [user, setUser] = useState({ name: "", email: "", location: "", password: "" })
  const [IsError, setIsError] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")
  // state end------------


  // All function -----------

  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value })

  }
  const formSubmit = async (e) => {

    e.preventDefault();
    let { name, email, location, password } = user;

    let res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",


      },
      body: JSON.stringify({ name, email, location, password })
    })
    let data = await res.json();

    if (data.status == 200) {
      localStorage.setItem('token', data.token);

      navigate('/')
    }
    if (user.email == 'purshottammaheshwari15@gmail.com' && data.status == 200) {
      navigate('/adminfood')
    }
    if (data.status == 404) {
      setIsError(true);
      seterrorMessage("Email does not exist")

    }
    if (data.status == 500) {
      setIsError(true);
      seterrorMessage("Invalid creadential")

    }


  }
  // All function end---------
  return (
    <div>
      <section class="vh-100 bg-image"
        style={{ "background-image": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
        <div class="mask d-flex align-items-center h-70 gradient-custom-3">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-40">
              <div class="col-12 col-md-1 col-lg-7 col-xl-6">
                <div class="card" style={{ "border-radius": "15px" }}>
                  <div class="card-body p-3">
                    <h2 class="text-uppercase text-center mb-2">Create an account</h2>

                    <form method='POST' onSubmit={formSubmit}>



                      <div class="form-outline mb-1">
                        <input type="email" onChange={inputChange} name='email' id="form3Example3cg" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Example3cg">Your Email</label>
                      </div>

                      <div class="form-outline mb-1">
                        <input type="password" onChange={inputChange} name='password' id="form3Example4cdg" class="form-control form-control-lg" />
                        <label class="form-label" for="form3Example4cdg"> Password</label>
                        {IsError && <p style={{ color: "red" }}>{errorMessage}</p>}
                      </div>



                      <div class="d-flex justify-content-center">
                        <input type="submit"
                          class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" value="Register" />
                      </div>

                      <p class="text-center text-muted mt-5 mb-0">Don't have account <Link to="/signup"
                        class="fw-bold text-body"><u>SignUp</u></Link></p>

                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
