import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_CALL } from '../api';
import { useParams } from 'react-router-dom';

const UserOrders = () => {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_CALL}/accounts/user/singleuser/${id}`
        );
        const cart = response.data[0].orders || [];

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
        setUser(response.data.data.orders);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="container my-4">
          <h2 className="text-center">User Orders</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Image</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((data, index) => (
                <tr key={index}>
                  <td className="text-dark fs-6">{data._id}</td>
                  <td className="text-dark fs-4">{data.name}</td>
                  <td className="text-dark fs-4">₹ {data.price}</td>
                  <td>
                    <img src={data.img} style={{ width: '100px' }} alt={data.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center">You haven't ordered any product yet!</h1>
      )}
    </>
  );
};

export default UserOrders;
