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


    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section id="relatedProducts" className='section'>
        <h2>Related Products</h2>
        <div className="related_container">
          {relatedProducts.map((data) => {
            return (<>

              <div className="related_box" key={data._id}>
                <img src={data.img} alt='relatedimage logo' onClick={() => productOpen(data._id)} />
                <div className="desc">


                  <Link
                    to={`/product/${data._id}`}
                    className='viewBtn'
                  >
                    View Product
                  </Link>
                </div>

              </div>

            </>)
          })}
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;
