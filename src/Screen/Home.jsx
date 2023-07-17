import React from 'react'
import { Carousel, Categories, NewArrivals, RandomProducts, Search, SpecificProduct } from '../components'

const Home = () => {
  return (
    <>
    <Carousel />
    <Categories />
    <RandomProducts />
    <NewArrivals />
    <SpecificProduct />
    </>
  )
}

export default Home