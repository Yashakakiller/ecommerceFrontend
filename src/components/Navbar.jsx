import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import {GiHamburgerMenu} from 'react-icons/gi'
import {BiUserCircle } from 'react-icons/bi'
import { API_CALL } from '../api';

import {AiFillCloseCircle} from 'react-icons/ai'
import axios from 'axios';

const Navbar = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const [user, setUser] = useState([]);

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
        setUser(response.data.data);
      } catch (error) {
      //  console.log(error);
      }
    };

    fetchData();
  }, []);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(`${API_CALL}/products/searchproduct/name`, {
  //       params: { query: searchTerm },
  //     });
  //     setSearchResults(response.data.products);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" to="/">
    //       MEENA CLOTH HOUSE
    //     </Link>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="btn btn-secondary" aria-current="page" to="/">
    //             Home
    //           </Link>
    //         </li>
    //       </ul>
    //       {/* <div className="d-flex">
    //         <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    //         <button className="btn btn-primary mx-2" onClick={handleSearch}>
    //           Search
    //         </button>
    //       </div> */}
    //       {localStorage.getItem('token') ? (
    //         <>
    //           <div className="d-flex">
    //             <Link className="btn btn-light m-2" to={`/cart/user/${user._id}`}>
    //               <FaShoppingCart className="me-1" />
    //               Cart
    //             </Link>
    //             <Link className="btn btn-light m-2" to={`/wishlist/user/${user._id}`}>
    //               <FaHeart className="me-1" />
    //               Wishlist {sharedData}
    //             </Link>
    //           </div>
    //           <Link className="btn btn-danger m-2 text-light" onClick={logoutHandler}>
    //             Logout
    //           </Link>
    //           <Link className="btn btn-success m-2" to={`/accounts/profile/user/${user._id}`}>
    //             Welcome
    //           </Link>
    //         </>
    //       ) : (
    //         <>
    //           <Link className="btn btn-warning m-2 text-light" to="/login">
    //             Login
    //           </Link>
    //           <Link className="btn btn-success m-2" to="/signup">
    //             Sign Up
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
      
    // </nav>


    <>
    
        <section id='header'>
            <Link to="/"><img  src="/logo-white.png" alt="logo" className='logo'/></Link>

            <div>
              <ul id='navbar'>
                    <li><Link to="/" className='active'>Home</Link></li>
                    <li><Link to="/allproducts">Shop</Link></li>
                    <li><Link to="/contact">Contact</Link></li>

                    <AiFillCloseCircle id='close' style={{display:"none"}}/>
                    {localStorage.getItem("token") ? (<>

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
