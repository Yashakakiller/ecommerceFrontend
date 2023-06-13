import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { API_CALL } from '../api';

const Navbar = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    // /accounts/user/auth/user/details
    const fetchData = async () => {
      try {
        const response = await axios.post(`  ${API_CALL}/accounts/user/auth/user/details`
        ,
          null,
          {
            headers: {
              token: `${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MEENA CLOTH HOUSE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="btn btn-secondary" aria-current="page" to="/">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.getItem('token') ? (
            <>
             <div className="d-flex">
            <Link className="btn btn-light m-2" to="/cart">
              <FaShoppingCart className="me-1" />
              Cart
            </Link>
            <Link className="btn btn-light m-2" to="/wishlist">
              <FaHeart className="me-1" />
              Wishlist
            </Link>
          </div>
              <Link className="btn btn-danger m-2 text-light" onClick={logoutHandler}>
                Logout
              </Link>
              <Link className="btn btn-success m-2" to={`/accounts/profile/user/${user._id}`}>
                Welcome {user.firstName}
              </Link>
            </>
          ) : (
            <>
             {/* <div className="d-flex">
            <Link className="btn btn-light m-2" to="/wishlist">
              <FaHeart className="me-1" />
              Wishlist
            </Link>
          </div> */}
              <Link className="btn btn-warning m-2 text-light" to="/login">
                Login
              </Link>
              <Link className="btn btn-success m-2" to="/signup">
                Sign Up
              </Link>
            </>
          )}
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
