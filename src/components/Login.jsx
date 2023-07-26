import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_CALL } from '../api';

const Login = () => {

    const [data,setData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()
    // /accounts/user/auth/login
    const submitHandler = async(e) => {
        e.preventDefault();

        const backend = await axios.post(`${API_CALL}/accounts/user/auth/login` ,data);
        console.log(backend.data.message)
        if(backend.data.success === false){
            return alert(backend.data.message)
        }
        localStorage.setItem("token",backend.data.data);
        navigate(`/accounts/profile/user/${backend.data.user._id}`) 

    }
    
    const valueHandler = (e) => {
        setData({...data , [e.target.name]:e.target.value})
    }

  return (
    <>
    
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card animated fadeInUp">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" name='email' id="email"  onChange={(e) => valueHandler(e)} placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" name='password' className="form-control" id="password" onChange={(e) => valueHandler(e)} placeholder="Enter your password" required />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Login