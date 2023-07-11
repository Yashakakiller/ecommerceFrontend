import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import d from '../../public/d.png';
import dd2 from '../../public/dd2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ productId }) => {
  const images = [d, dd2];
  const randomImage = Math.floor(Math.random() * images.length);
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const [auth,setAuth] = useState(false)
  console.log(cartItems)
  
  const notify = (message) => toast(message);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const cart = response.data.user[0].cart || [];

        const itemsWithProductDetails = await Promise.all(
          cart.map(async (itemId) => {
            const productResponse = await axios.get(`${API_CALL}/products/product/${itemId}`);
            return { productId: itemId, product: productResponse.data.product };
          })
        );

        if(response.data.success){
          setCartItems(itemsWithProductDetails);
          setAuth(true)
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const updateQuantity = (productId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedItems);
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${API_CALL}/cart/user/${id}/${productId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      for (const item of cartItems) {
        const { productId, quantity } = item;
        const response = await axios.post(`${API_CALL}/cart/place_Order/${id}`, {
          _id: productId,
          quantity: parseInt(quantity), // Convert quantity to a number
        });
        console.log(response.status);
        if(!response.data.success){
          notify(response.data.message);
        }
        else{

        setTotalPrice(0);
        navigate(`/order_successfull/${id}`); // Redirect to the order placed page
      }

      }
      // Clear the cart after placing the order
      
      
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <>
      {localStorage.getItem('token')  && auth ? (
        cartItems.length > 0 ? (
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
theme="light"
/>
            <main className="table">
              <section className="table__header">
                <h3>Cart Items</h3>
              </section>
              <section className="table__body">
                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Category Name</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.product._id}</td>
                        <td>{item.product.name}</td>
                        <td>₹ {item.product.price}</td>
                        <td>
                          <img src={item.product.img} alt="" />
                        </td>
                        <td>
                          <input
                            style={{
                              background: '#000216',
                              color: '#b99835',
                              fontSize: '20px',
                              width: '100px',
                              padding: '5px',
                            }}
                            type="number"
                            min="1"
                            max={item.product.quantity}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                          />
                        </td>
                        <td>{item.product.price * item.quantity}</td>
                        <td>
                          <BsTrash style={{ cursor: 'pointer' }} onClick={() => removeFromCart(item.productId)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </main>
            <h3 style={{ textAlign: 'center' }}>Your Total - ₹{totalPrice}</h3>
            <button className="btn btn-primary d-block m-auto w-50" onClick={placeOrder}>
              Place Order Now
            </button>
          </>
        ) : (
          <div className="wishlistContainer">
            <h3>No Items in the Cart</h3>
            <img alt="" src={images[randomImage]} />
          </div>
        )
      ) : (
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fs-4">Please Login First</h5>
                  <p className="card-text fs-5">To view your cart, please log in to your account.</p>
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
