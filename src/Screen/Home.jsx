import React from 'react'
import { Carousel, Categories, NewArrivals, NewsLetter, RandomProducts, Search } from '../components'

const Home = () => {
  return (
    <>
    <Carousel />
    <Categories />
    <RandomProducts />
    <NewArrivals />
    <NewsLetter />
    </>
  )
}

export default Home