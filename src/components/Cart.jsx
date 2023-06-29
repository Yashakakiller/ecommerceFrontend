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
        console.log(response);
        setUser(response.data.data.cart);
      } catch (error) {
        console.log(error);
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
      quantity,
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

      const updatedCart = cartItems.filter(
        (item) => item._id !== productId
      );
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
            <>
              <div className="table-container">
                <table>
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
                          <td className="fs-2">{data.name}</td>
                          <td className="fs-2">{data.quantity}</td>
                          <td className="fs-2">{data.price}</td>
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
                            <p className="text-center fs-3 bg-dark text-light" style={{ borderRadius: "40px" }}>
                              Your Product Total is {data.price * data.quantity}
                            </p>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                    <tr>
                      <td colSpan="5">
                        <p className="text-center fs-1">
                          Your Total is {totalPrice}
                        </p>
                        <button
                          onClick={() => placeOrder(data._id, data.quantity)}
                          className="btn-secondary btn d-block m-auto w-50"
                        >
                          Order Now
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </>
      ) : (
        <div className="text-center">
          <p>Please login to view your cart.</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
