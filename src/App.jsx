import React from 'react'
import { Routes , Route } from 'react-router-dom';
import { Navbar  , UserProfile , Login, Signup, Products, Footer} from './components';
import './App.css'
import Home from './Screen/Home';

const App = () => {
  return (
   <>
   <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path="/accounts/profile/user/:id" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/byCategory/:category" element={<Products />} />
      </Routes>

      <Footer />
   </>
  )
}

export default App