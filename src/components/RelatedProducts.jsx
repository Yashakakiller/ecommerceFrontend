import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_CALL } from '../api';

const RelatedProducts = ({ id }) => {
  const [user, setUser] = useState([]);

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
        setUser(response.data.data);
      } catch (error) {
    //    console.log(error);
      }
    };

    fetchData();
  }, []);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/products/byname/${id}`);
        setRelatedProducts(response.data.relatedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_CALL}/wishlist/user/${user._id}`,
        { _id: productId }
      );
      // console.log(response.data);

      updateSharedData(user.wishlist.length + 1);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
    <hr className='bg-dark'/>
      <h2 className='text-center'>Related Products</h2>
      <div className='d-flex flex-wrap justify-content-center align-items-center p-4'>
        {relatedProducts.map((product) => (
          <React.Fragment key={product._id}>
            <div className='col-md-4 mb-4'>
              <div
                className='card'
                style={{
                  width: '20rem',
                  maxHeight: '760px',
                  boxShadow: '3px 3px 10px black',
                }}
              >
                <img
                  src={product.img}
                  className='card-img-top'
                  alt='Product'
                  style={{ height: '420px', objectFit: 'fill' }}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{product.name}</h5>
                  <p className='card-price'>
                    ₹ <b>{product.price}</b>
                  </p>

                  {product.quantity == 0 || product.quantity == null ? (
                    <p className='text-danger'>
                      Out of Stock .. Will Back Soon !!!
                    </p>
                  ) : (
                    <>
                      {product.quantity >= 1 && product.quantity <= 5 ? (
                        <p className='text-danger'>
                          Hurry only few products left
                        </p>
                      ) : null}
                    </>
                  )}

{user.wishlist.includes(product._id) ? (
                    <button
                      className="btn btn-secondary d-block my-3 mx-auto disabled"
                    >
                      Already added to wishlist
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary d-block my-3 mx-auto"
                      onClick={() => addWishlist(product._id)}
                    >
                      Add to wishlist
                    </button>
                  )}
                  <Link
                    to={`/product/${product._id}`}
                    className='w-100 my-2 btn btn-secondary'
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
