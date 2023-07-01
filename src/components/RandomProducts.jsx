import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_CALL } from '../api';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';



const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
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
      //  console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/bestDeal/product`);
      const data = response.data.randomProducts; // Access the randomProducts array
      // console.log(data)
      setRandomProducts(data);
    } catch (error) {
      console.error("Error fetching random products:", error);
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

    // <div className='container mt-5' style={{ background: "black", padding: "5px", marginBottom: "10px", borderRadius: "10px" }}>
    //   <h1 className='text-center head2 '>Products of the Day</h1>
    //   <div className="container d-flex flex-wrap justify-content-center">
    //     {randomProducts.map((product) => (
    //       <div className="card m-3 " key={product._id} style={{ width: "280px", maxHeight: "600px", overflow: "hidden",boxShadow:"4px 3px 8px gold" }}>
    //         <img src={product.img} className="card-img-top" alt="Card" style={{ maxHeight: "400px" }} />
    //         <div className="card-body">
    //           <h5 className="card-title text-center fs-2">{product.name}</h5>
    //           <Link to={`/product/${product._id}`} className="text-light btn btn-dark d-block">Checkout {product.name}</Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <>
      <section id="featuredProducts" className='section-p1'>
        <h2>Featured Products</h2>
        <p>Get the Best of Rest!</p>
        <div className="feat_container">
          {randomProducts.map((feat) => {
            return (<>
              <div className="feat_box">
                <img src={feat.img} alt='featured image logo' />
                <div className="desc">
                  <h5>{feat.name}</h5>
                  <h4>₹ {feat.price}</h4>
                </div>
              <Link to="/" className='featcart'><FaShoppingCart  onClick={() => addToCart(feat._id,1)}/></Link>
              </div>
            </>)
          })}
        </div>
      </section>
    </>
  );
};

export default RandomProducts;
