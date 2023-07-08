import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_CALL } from '../api';
import axios from 'axios';
import d from '../../public/d.png';
import dd2 from '../../public/dd2.png';

const Cart = () => {
  const images = [d, dd2];
  const randomImage = Math.floor(Math.random() * images.length);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();



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
        console.error('Error fetching user:', error);
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
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          {cartItems.length > 0 ? (
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
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((data) => (
                      <tr key={data._id}>
                        <td>{data._id}</td>
                        <td>{data.categoryName}</td>
                        <td>{data.name}</td>
                        <td>
                          <img alt="" src={data.img} />
                        </td>
                        <td>{data.quantity}</td>
                        <td>
                          <strong>₹ {data.price}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </main>
          ) : (
            <div className="wishlistContainer">
              <h3>No Items in the Cart</h3>
              <img alt="" src={images[randomImage]} />
            </div>
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
