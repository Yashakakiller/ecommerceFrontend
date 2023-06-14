import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const ProductsDetailPage = () => {

  const {id} = useParams()

  const [Product, setProduct] = useState([])

  useEffect(()=>{
      fetchData()
  },[id])


  const fetchData = async () => {
    const backend = await axios.get(`https://ecommerce-backend-vyn1.onrender.com/products/product/${id}`)
    console.log(backend.data)
    setProduct(backend.data)
  }

  return (
    <h1>{Product.product.name}</h1>
  )
}

export default ProductsDetailPage