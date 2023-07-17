import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {API_CALL} from '../api'



const SpecificProduct = () => {
    const [formData , setFormData] = useState({
        email:"",
        name:""
    })


    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = await axios.post(`${API_CALL}/contact/specificProduct`,formData)
        setFormData({
            email:"",
            name:""
        })
    }


    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }


  return (
    <>
        <section id="newsletter" className='section-p1' style={{margin:"0 auto",width:"95%",borderRadius:"30px"}}>
            <div className="newsText">
                <h4>Want a Specific Product</h4>
                <p>Just mail us!!!</p>
            </div>
            <form className="newsform" onSubmit={handleSubmit}>
                <input type="text" className='my-2'  placeholder='Your Name' value={formData.name} name='name' onChange={(e) => handleChange(e)}/>
                <input type="text"  placeholder='Your E-mail Address' value={formData.email} name='email' onChange={(e) => handleChange(e)}/>
                <button>Sign Up</button>
            </form>
        </section>
        </>
  )
}

export default SpecificProduct