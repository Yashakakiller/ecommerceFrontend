import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_CALL } from '../api';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';

const Cart = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);

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
        setUser(response.data.data.cart);
        console.log(response.data.data.cart);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_CALL}/accounts/user/singleuser/${id}`
        );
        const cart = response.data[0].cart || [];

        const itemsWithProductDetails = await Promise.all(
          cart.map(async (itemId) => {
            const productResponse = await axios.get(
              `${API_CALL}/products/product/${itemId}`
            );
            return productResponse.data.product;
          })
        );

        setCartItems(itemsWithProductDetails);
        calculateTotalPrice(itemsWithProductDetails);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchData();
  }, [id]);

  const calculateTotalPrice = (items) => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  };

  const placeOrder = async (_id, quantity) => {
    const backend = await axios.post(`${API_CALL}/cart/place_order/${id}`, {
      _id,
    });
    navigate(`/order_successfull/${id}`);
  };

  const removeCartItem = async (productId) => {
    try {
      await axios.delete(`${API_CALL}/cart/user/${id}`, {
        data: { _id: productId },
      });

      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== productId)
      );

      const updatedCart = cartItems.filter((item) => item._id !== productId);
      calculateTotalPrice(updatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          {cartItems.length > 0 ? (
            <div className="container my-4">
              <h2 className="text-center">Cart</h2>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((data) => (
                    <React.Fragment key={data._id}>
                      <tr>
                        <td className="fs-5">{data.name}</td>
                        <td className="fs-5">{data.quantity}</td>
                        <td className="fs-5">₹ {data.price}</td>
                        <td>
                          <img
                            src={data.img}
                            style={{ width: '150px' }}
                            alt={data.name}
                          />
                        </td>
                        <td>
                          <BsTrash
                            style={{
                              cursor: 'pointer',
                              fontSize: '30px',
                            }}
                            onClick={() => removeCartItem(data._id)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          <p className="text-center fs-5 bg-dark text-light rounded-pill p-2">
                            Your Product Total is {data.price * data.quantity}
                          </p>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                  <tr>
                    <td colSpan="5">
                      <p className="text-center fs-4">
                        Your Total is ₹ {totalPrice}
                      </p>
                      <button
                        onClick={() => placeOrder(user._id, 3)}
                        className="btn btn-secondary btn-block d-block m-auto"
                      >
                        Order Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </>
      ) : (
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fs-4">Please Login First</h5>
                  <p className="card-text fs-5">
                    To view your cart, please log in to your account.
                  </p>
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
