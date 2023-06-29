import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Navbar, UserProfile, Login, Signup, Products, Footer, ProductDetailPage, Wishlist, Cart, OrderPageSuccessfull, UserOrders } from './components';
import './App.css'
import Home from './Screen/Home';
import ContextProviderComponent from './Context';



const App = () => {
  return (
    <ContextProviderComponent>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/accounts/profile/user/:id" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/byCategory/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/wishlist/user/:id" element={<Wishlist />} />
        <Route path="/cart/user/:id" element={<Cart />} />
        <Route path="/order_successfull/:id" element={<OrderPageSuccessfull />} />
        <Route path='/orders/user/:id' element={<UserOrders />} />
      </Routes>

      <Footer />
    </ContextProviderComponent>

  )
}

export default App