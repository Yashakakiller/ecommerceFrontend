import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_CALL } from '../api';

const Signup = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
        gender: ""
    })


    const submitHandler = async (e) => {
        e.preventDefault()
        const backend = await axios.post(`${API_CALL}/accounts/user/create`, data)
        if (backend.data.success === false) {
            alert("Email Already Exists \n Please Try with Another Email ...")
            setData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                address: "",
                password: "",
                gender: ""
            })
        }
        localStorage.setItem("token", backend.data.token)
        navigate(`/accounts/profile/user/${backend.data.user._id}`)
    }

    const valueHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <div className="card animated fadeInUp">
                            <div className="card-header">
                                <h3 className="text-center">Sign Up</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitHandler}>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input type="text" value={data.firstName } className="form-control" name='firstName' id="name" onChange={(e) => valueHandler(e)} placeholder="Enter your First name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" value={data.lastName } className="form-control" name='lastName' id="name" onChange={(e) => valueHandler(e)} placeholder="Enter your Last name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" value={data.email} className="form-control" name='email' id="email" onChange={(e) => valueHandler(e)} placeholder="Enter your email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" value={data.password} name='password' className="form-control" id="password" onChange={(e) => valueHandler(e)} placeholder="Enter your password" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="number" value={data.phone} name='phone' className="form-control" id="phone" onChange={(e) => valueHandler(e)} placeholder="Enter your phone" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" value={data.address} className="form-control" name='address' id="address" onChange={(e) => valueHandler(e)} placeholder="Enter your address" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <input type="text" value={data.gender} className="form-control" name='gender' id="gender" onChange={(e) => valueHandler(e)} placeholder="Enter your gender" required />
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-dark btn-lg">Sign Up</button>
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

export default Signup