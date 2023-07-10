import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_CALL } from '../api';
import d from '../../public/d.png';
import dd2 from '../../public/dd2.png';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserOrders = () => {
  const { id } = useParams();
  const [orderItems, setorderItems] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate()
  const [auth , setAuth] = useState(false)

  const images = [d, dd2];
  const randomImage = Math.floor(Math.random() * images.length);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_CALL}/accounts/user/singleuser/${id}`
        );
        const cart = response.data.user[0].orders || [];
        console.log(response.data , "bye")

        const itemsWithProductDetails = await Promise.all(
          cart.map(async (itemId) => {
            const productResponse = await axios.get(
              `${API_CALL}/products/product/${itemId}`
            );
            return productResponse.data.product;
          })
        );
         
        setorderItems(itemsWithProductDetails);
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
        console.log(response , "hello")
        if(response.data.success){
          setAuth(true)
        }
        // console.log(response.data.data.orders)
        setUser(response.data.user.orders);
        console.log(user)
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {localStorage.getItem('token')  && auth ? (
        <>
          {orderItems.length == 0 || orderItems === null ? (
            <div className="wishlistContainer">
              <h3>You haven't purchased anything yet!</h3>
              <img alt="" src={images[randomImage]} />
            </div>
          ) : (
            <>
               <main className="table">
    <section className="table__header">
      <h3>Orders Items</h3>


    </section>
    <section className="table__body">
      <table>
        <thead>
          <tr>
            <th> Id </th>
            <th> Category Name </th>
            <th> Name </th>
            <th> Image </th>
            <th> </th>
            <th> Price</th>
            

          </tr>
        </thead>
        <tbody>
  {orderItems.map((data) => (
    <tr key={data._id}>
      <td>{data._id}</td>
      <td>{data.categoryName}</td>
      <td>{data.name}</td>
      <td>
        <img alt="" src={data.img} />
      </td>
      <td></td>
      <td>
        <strong>₹ {data.price}</strong>
      </td>
     
    </tr>
  ))}
</tbody>

      </table>
    </section>
  </main>
            </>
          )}
        </>
      ) : (
        <>
           <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fs-4">Please Login First</h5>
                  <p className="card-text fs-5">
                    To view your orders, please log in to your account.
                  </p>
                  <Link to="/login" className="btn btn-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default UserOrders;
