import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API_CALL } from '../api';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [auth,setAuth] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate()
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
        if(response.data.success){
          setUser(response.data.data);
          setAuth(true)
        }
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/bestDeal/product`);
      const data = response.data.randomProducts; // Access the randomProducts array
      setRandomProducts(data);
    } catch (error) {
      console.error("Error fetching random products:", error);
    }
  };

  const addToCart = async (_id, quantity) => {
    try {
    
      const response = await axios.post(`${API_CALL}/cart/user/${user._id}`, {
        _id,
        quantity: quantity,
      });
const notify = () => toast(response.data.message)
      notify()        
      
      // console.log(response.data);
    } catch (error) {
      console.log(error.message)
    }
  };

  const productOpen = async(pId) => {
    navigate(`/product/${pId}`)
  }

  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <section id="featuredProducts" className='section-p1'>
        <h2>Featured Products</h2>
        <p>Get the Best of Rest!</p>
        <div className="feat_container">
          {randomProducts.map((feat) => (
            <div className="feat_box" key={feat._id}>
              <img src={feat.img} alt='featured image logo' onClick={() => productOpen(feat._id)}/>
              <div className="desc">
                <h5>{feat.name}</h5>
                <h4>₹ {feat.price}</h4>
              </div>
              {auth ? (<>{feat.quantity > 0 ? (<><>{user.cart.includes(feat._id) ? (<><Link to="/" className='featcart'><FaShoppingCart onClick={() => {const notify = () => toast("Already Added To Cart")
                  notify()}} /></Link></>) : (<><Link to="/" className='featcart'><FaShoppingCart onClick={() => addToCart(feat._id, 1)} /></Link></>)}</></>) : (<>    <h4 className='text-danger text-center'>Out of Stock!!!</h4>     </>)}</>)  : (<></>)}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RandomProducts;
