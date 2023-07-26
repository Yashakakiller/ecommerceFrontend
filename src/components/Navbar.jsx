import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';
import { API_CALL } from '../api';
import { AiFillCloseCircle } from 'react-icons/ai';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);

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
        if (response.data.success) {
          setUser(response.data.data);
          setAuth(true);
        }
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };

  const closeNavbar = () => {
    setNavbarActive(false);
  };

  return (
    <>
      <section id='header'>
        <Link to='/'>
          <img src='/logo-white.jpg' alt='logo' className='logo' />
        </Link>

        <div>
          <ul id={navbarActive ? 'navbar active' : 'navbar'}>
            <li>
              <Link to='/' className='active'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/allproducts'>Shop</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>

            {localStorage.getItem('token') ? (
              <>
              {auth ? (<> <li>
                  <Link to={`/cart/user/${user._id}`}>
                    <FaShoppingCart />
                  </Link>
                </li>

                <li>
                  <Link to={`/wishlist/user/${user._id}`}>
                    <FaHeart />
                  </Link>
                </li>

                <li>
                  <Link to={`/accounts/profile/user/${user._id}`}>
                    <BiUserCircle />
                  </Link>
                </li>

                <li>
                  <Link onClick={logoutHandler}>Logout</Link>
                </li></>) : (<></>)}
          
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/signup'>Signup</Link>
                </li>
              </>
            )}
          </ul>
          {navbarActive && (
            <AiFillCloseCircle
              id='close'
              style={{ display: 'block' }}
              onClick={closeNavbar}
            />
          )}
        </div>
        <div className='burger'>
          <GiHamburgerMenu
            style={{ fontSize: '35px' }}
            onClick={toggleNavbar}
          />
        </div>
      </section>
    </>
  );
};

export default Navbar;
