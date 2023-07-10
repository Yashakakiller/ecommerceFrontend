import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import d from '../../public/d.png'
import dd2 from '../../public/dd2.png'


const Wishlist = () => {
  const images = [d , dd2]
  const randomImage = Math.floor(Math.random() * images.length);
// console.log(randomImage);

  
  const { id } = useParams();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState([]);
  const [auth ,setAuth] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: `${localStorage.getItem("token")}`,
            },
          }
        );
        if(response.data.success){
          setAuth(true)
        }
        setUser(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const wishlist = response.data.user[0].wishlist || [];
        
        console.log(response.data)

        const itemsWithProductDetails = await Promise.all(
          wishlist.map(async (itemId) => {
            const productResponse = await axios.get(`${API_CALL}/products/product/${itemId}`);
            return productResponse.data.product;
          })
        );

        setWishlistItems(itemsWithProductDetails);

        
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchData();
  }, [id]);

  const removeWishlist = async (productID) => {
    try {
      await axios.delete(`${API_CALL}/wishlist/user/${id}`, {
        data: { _id: productID },
      });

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== productID)
      );

      // Update the shared data
      
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('token') && auth ? (
        <>
          {wishlistItems.length == 0 || wishlistItems === null ? (
            <div className="wishlistContainer">
              <h3>No Items in the Wishlist</h3>
              <img alt="" src={images[randomImage]} />
            </div>
          ) : (
            <>
               <main className="table">
    <section className="table__header">
      <h3>Wishlist Items</h3>


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
            <th></th>

          </tr>
        </thead>
        <tbody>
  {wishlistItems.map((data) => (
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
      <td>
        <BsTrash
          style={{ cursor: "pointer" }}
          onClick={() => removeWishlist(data._id)}
        />
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
                    To view your wishlist, please log in to your account.
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

export default Wishlist;
