import React, { useEffect, useState } from 'react'
import axios from 'axios'


const NewArrivals = () => {
    const [products , setProducts] = useState([])

    const fetchProducts = async() =>{
        const products = await axios.get("http://localhost:5000/products/try");
        setProducts(products.data)
    }
    useEffect(()=>{
        fetchProducts()
    },[])
console.log(products)
  return (
    <>
        <section id="newProducts" className='section-p1'>
        <h2>New Arrivals</h2>
        <p>Get the Best of Rest!</p>
        <div className="new_container">
          {products.map((data) => {
              return (<div >
               
              <div className="new_box">
                <img src={data.img} alt='dataured image logo' />
                <div className="desc">
                  <h5>{data.name}</h5>
                </div>
                <img src="../../public/new_arrival.png" alt="" className="newAlogo" />
              </div>
             
            </div>)
          })}
        </div>
      </section>
    </>
  )
}

export default NewArrivals