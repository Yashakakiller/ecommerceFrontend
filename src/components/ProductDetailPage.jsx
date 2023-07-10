import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import RelatedProducts from './RelatedProducts';
import Cart from './Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductsDetailPage = () => {
  
  const [quantity, setSelectedQuantity] = useState(1);
  const [user, setUser] = useState({ wishlist: [], cart: [] });
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [auth , setAuth] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );
        if(response.data.success){
          setAuth(true)
        }
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
        const response = await axios.get(`${API_CALL}/products/product/${id}`);
        setProduct(response.data.product);
        console.log(response.data.product);
        setSelectedImage(response.data.product.img); // Set the default image
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(`${API_CALL}/wishlist/user/${user._id}`, {
        _id: productId,
      });
      const notify = () => toast(response.data.message)
      notify()  
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImage = (e, image) => {
    setSelectedImage(image);
  };


  const addToCart = async (_id, quantity) => {
    try {
    
      const response = await axios.post(`${API_CALL}/cart/user/${user._id}`, {
        _id,
        quantity: Math.min(quantity, product.quantity),
      });
const notify = () => toast(response.data.message)
      notify()        
      
      // console.log(response.data);
    } catch (error) {
      console.log(error.message)
    }
  };


  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <section className="container sproduct mb-5 pt-5">
        <div className="row mt-5">
          <div className="col-lg-5 col-md-12 col-12">
            <img
              alt=""
              src={selectedImage}
              className="mainImage pb-1 img-fluid"
              id="mainImage"
            />

            <div className="small-img-group">
              {product.otherImages &&
                product.otherImages.map((otherImage) => (
                  <div className="small-img-col" key={otherImage}>
                    <img
                      className="small-img"
                      src={otherImage}
                      alt=""
                      onClick={(e) => handleImage(e, otherImage)}
                    />
                  </div>
                ))}
              <div className="small-img-col">
                <img
                  className="small-img"
                  src={product.img}
                  alt=""
                  onClick={(e) => handleImage(e, product.img)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-12 p-desc">
            <h6>{product.category}</h6>
            <h3 className="py-4">{product.name}</h3>
            <h2>₹{product.price}</h2>
            {product.quantity === 0 || product.quantity === null ? (
              <h3 className="text-danger">Out of Stock!</h3>
            ) : (
              <>
                {/* <h4>Select Quantity</h4>
                <select
                  className="my-3"
                  value={quantity}
                  onChange={(e) =>
                    setSelectedQuantity(parseInt(e.target.value))
                  }
                >
                  {Array.from({ length: product.quantity }, (_, i) => i + 1).map(
                    (value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select> */}

                {localStorage.getItem("token") && auth ? (<>{user.cart.includes(product._id) ? (
                  <button
                    onClick={() =>{ const notify = () => toast("Already Added To Cart")
                      notify()}}
                    className="buy-btn mx-2"
                  >
                    Already Added To Cart
                  </button>
                ) : (
                  <button
                    className="buy-btn mx-2"
                    onClick={() => addToCart(product._id, quantity)}
                  >
                    Add To Cart
                  </button>
                )}
                {user.wishlist.includes(product._id) ? (
                  <button className="buy-btn" onClick={() => {const notify = () => toast("Already Added To Wishlist")
                  notify()}}>
                    Already Added To Wishlist
                  </button>
                ) : (
                  <button
                    className="buy-btn"
                    onClick={() => addWishlist(product._id)}
                  >
                    Add To Wishlist
                  </button>
                )}</>) : (<><button className="buy-btn" onClick={() => {navigate("/login")}}>
                Please Login First to Continue
              </button></>)}
              </>
            )}
            <h4 className="mt-5 mb-5">Product Details</h4>
            <span>{product.desc}</span>
          </div>
        </div>
        <RelatedProducts id={product._id} />
      </section>
      <div style={{ display: "none" }}>
        <Cart productId={product._id} />
      </div>
    </>
  );
};

export default ProductsDetailPage;
