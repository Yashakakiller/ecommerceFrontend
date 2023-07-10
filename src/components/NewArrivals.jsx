import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_CALL } from '../api'
import { useNavigate } from 'react-router-dom'


const NewArrivals = () => {
    const [products , setProducts] = useState([])
    const navigate = useNavigate()

    const fetchProducts = async() =>{
        const products = await axios.get(`${API_CALL}/products/newArrivals`);
        setProducts(products.data.products)
        
    }
    useEffect(()=>{
        fetchProducts()
    },[])
// console.log(products)


const productOpen = async(pId) => {
  navigate(`/product/${pId}`)
}


  return (
    <>
        <section id="newProducts" className='section-p1'>
        <h2>New Arrivals</h2>
        <p>Get Ready for Trends!</p>
        <div className="new_container">
          {products.map((data) => {
              return (<div key={data._id}>
               
              <div className="new_box">
                <img src={data.img} alt='dataured image logo' onClick={() => productOpen(data._id)}/>
                <div className="desc">
                  <h5>{data.name}</h5>
                </div>
                {/* <img src="/new_arrival.png" alt="" className="newAlogo" /> */}
              </div>
             
            </div>)
          })}
        </div>
      </section>
    </>
  )
}

export default NewArrivals