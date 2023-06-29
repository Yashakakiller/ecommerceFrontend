import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_CALL } from '../api'
import RelatedProducts from './RelatedProducts'

const ProductsDetailPage = () => {
  const [quantity, setSelectedQuantity] = useState(1);
  const [user, setUser] = useState({ wishlist: [] }); // Initialize wishlist as an empty array

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
       // console.log(error);
      }
    };

    fetchData();
  }, []);

  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    const backend = await axios.get(`${API_CALL}/products/product/${id}`);
    setProduct(backend.data.product);
  };

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_CALL}/wishlist/user/${user._id}`,
        { _id: productId }
      );
      // console.log(response.data);
    } catch (error) {
    //  console.log(error.message);
    }
  };

  const addToCart = async (_id, quantity) => {
    try {
      const response = await axios.post(
        `${API_CALL}/cart/user/${user._id}`,
        { _id, quantity }
      );
    //  console.log(response.data);
    } catch (error) {
    //  console.log(error.message);
    }
  };





  return (
    <>
      <section className="product-section mt-4">
        <div
          className="container bg-dark p-3"
          style={{ width: "50%", borderRadius: "5px" }}
        >
          <div className="row">
            <div className="col-md-6">
              <img
                src={product.img}
                alt="Product Image"
                className="product-image img-fluid rounded"
                style={{ maxHeight: "500px", boxShadow: "4px 3px 8px white" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="product-title text-light text-center fs-1">
                {product.name}
              </h2>
              <p className="product-description text-light mt-4 text-center fs-4">
                {product.desc}
              </p>
              <h3 className="product-price text-light text-center fs-3">
                ₹ {product.price}
              </h3>

              {localStorage.getItem("token") ? (
                <>
                  <button className="btn btn-warning d-block my-5 mx-auto">
                    Buy Now
                  </button>
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

                  <select
                    className="form-select d-block my-5 mx-auto"
                    value={quantity}
                    onChange={(e) =>
                      setSelectedQuantity(parseInt(e.target.value))
                    }
                  >
                    {Array.from({ length: product.quantity }, (_, i) => i + 1).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-primary d-block my-3 mx-auto"
                    onClick={() => addToCart(product._id, quantity)}
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Please Login to Buy This Product
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts id={id}/>
    </>
  );
}

export default ProductsDetailPage;
