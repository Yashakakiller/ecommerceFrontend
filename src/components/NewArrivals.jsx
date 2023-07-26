import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_CALL } from '../api'
import { useNavigate } from 'react-router-dom'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const fetchProducts = async () => {
    const response = await axios.get(`${API_CALL}/products/newArrivals`);
    setProducts(response.data.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const productOpen = async (pId) => {
    navigate(`/product/${pId}`)
  }

  return (
    <>
      <section id="newProducts" className='my-4'>
        <h2>New Arrivals</h2>
        <p>Get Ready for Trends!</p>
        <div className="new_container">
          {products.length > 0 ? (
            products.map((data) => (
              <div className="new_box" key={data._id}>
                <img src={data.img} alt='dataured image logo' onClick={() => productOpen(data._id)} />
                <div className="desc">
                  {data.name.length > 90 ? (<h5>{data.name.slice(0, 85)}...</h5>) : (<h5>{data.name}</h5>)}
                  {data.quantity === 0 ? (<h5 className='text-danger'>OOPS! Out of Stock</h5>) : (<h5>Quantity Available - {data.quantity}</h5>)}
                </div>
              </div>
            ))
          ) : (
              <h3 className='text-center text-danger'>No New Products Arrived..</h3>
            )}
        </div>
      </section>
    </>
  )
}

export default NewArrivals
