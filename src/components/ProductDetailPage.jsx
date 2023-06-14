import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const ProductsDetailPage = () => {

  const {id} = useParams()

  const [Product, setProduct] = useState([])

  useEffect(()=>{
      fetchData()
  },[])


  const fetchData = async () => {
    const backend = await axios.get(`https://ecommerce-backend-vyn1.onrender.com/products/product/${id}`)
    console.log(backend.data)
    setProduct(backend.data)
  }

  return (
    <div>ProductsDetailPage</div>
  )
}

export default ProductsDetailPage