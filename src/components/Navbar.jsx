import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi'
import {BiUserCircle } from 'react-icons/bi'
import { API_CALL } from '../api';

import {AiFillCloseCircle} from 'react-icons/ai'
import axios from 'axios';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [user, setUser] = useState([]);
  const [auth , setAuth] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: `${localStorage.getItem('token')}`,
            },
          }
        );


        console.log(response)
       if(response.data.success){
         setUser(response.data.data);
         setAuth(true)
       }
      } catch (error) {
      //  console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/searchproduct/name`, {
        params: { query: searchTerm },
      });
      setSearchResults(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  const toggleNavbar = (e) => {
    let nav = document.getElementById("navbar");
    let closeIcon = document.getElementById("close");
  
    if (!nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
    // closeIcon.style.display ="block";
    closeIcon.style.display ="block";
    closeIcon.addEventListener("click",()=>{
      nav.classList.remove("active")
    })
    nav.classList.add("active");
  };
  


  return (
  
    <>

        <section id='header'>
            <Link to="/"><img  src="/logo-white.jpg" alt="logo" className='logo'/></Link>

            <div>
              <ul id='navbar'>
                    <li><Link to="/" className='active'>Home</Link></li>
                    <li><Link to="/allproducts">Shop</Link></li>
                    <li><Link to="/contact">Contact</Link></li>

                    <AiFillCloseCircle id='close' style={{display:"none"}}/>
                    {localStorage.getItem("token") && auth ? (<>

                      <li><Link to={`/cart/user/${user._id}`}><FaShoppingCart /></Link></li>

                      <li><Link to={`/wishlist/user/${user._id}`}><FaHeart /></Link></li>

                      <li><Link to={`/accounts/profile/user/${user._id}`}><BiUserCircle /></Link></li>

                      <li><Link onClick={logoutHandler}>Logout</Link></li>

                     
                    </>) : (
                      <>
                      <li><Link  to="/login">Login</Link></li>
                      <li><Link to="/signup">Signup</Link></li>
                      </>
                    )}
              </ul>
            </div>
            <div className="burger">
                      <GiHamburgerMenu style={{fontSize:"35px"}} onClick={(e) => toggleNavbar(e)}/>
            </div>
        </section>


    </>
  );
};

export default Navbar;