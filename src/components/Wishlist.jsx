import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { MyContext } from '../Context';

const Wishlist = () => {
  const { sharedData, updateSharedData } = useContext(MyContext);
  const { id } = useParams();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState([]);

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
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const wishlist = response.data[0].wishlist || [];

        const itemsWithProductDetails = await Promise.all(
          wishlist.map(async (itemId) => {
            const productResponse = await axios.get(`${API_CALL}/products/product/${itemId}`);
            return productResponse.data.product;
          })
        );

        setWishlistItems(itemsWithProductDetails);

        updateSharedData(itemsWithProductDetails.length);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchData();
  }, [id, updateSharedData]);

  const removeWishlist = async (productID) => {
    try {
      await axios.delete(`${API_CALL}/wishlist/user/${id}`, {
        data: { _id: productID },
      });

      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== productID)
      );

      // Update the shared data
      updateSharedData(wishlistItems.length - 1);
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  // const addToCart = async (_id) => {
  //   try {
  //     const response = await axios.post(
  //       `${API_CALL}/cart/user/${user._id}`,
  //       { _id } 
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          <div className="container my-4 bg-dark p-2">
            <h2 className="text-center text-light">Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <p className="text-light text-center">No items in the wishlist.</p>
            ) : (
              <table className="table table-striped">
                <thead className="thead-success">
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Product Image</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item) => (
                    <tr key={item._id}>
                      <td className="fs-3">{item.name}</td>
                      <td className="fs-3">₹ {item.price}</td>
                      <td>
                        <img src={item.img} alt={item.name} style={{ width: '150px' }} />
                      </td>
                      <td style={{ cursor: 'pointer', fontSize: '30px' }}>
                        <Link to={`/product/${item._id}`} className="btn btn-primary p-2 m-2">
                          View Product
                        </Link>
                        <br />
                        {/* <Link
                          className="btn btn-warning p-2 m-2"
                          onClick={() => addToCart(item._id)}
                        >
                          Add To Cart
                        </Link> */}
                        <BsTrash onClick={() => removeWishlist(item._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row justify-content-center mt-5">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title fs-1">Please Login First</h5>
                    <p className="card-text fs-4">
                      To access this page, you need to login to your account.
                    </p>
                    <Link to="/login" className="btn btn-secondary">
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
