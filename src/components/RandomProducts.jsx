import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_CALL } from '../api';



const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);

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

  return (
    <div className='container mt-5' style={{ background: "black", padding: "5px", marginBottom: "10px", borderRadius: "10px" }}>
      <h1 className='text-center head2 '>Products of the Day</h1>
      <div className="container d-flex flex-wrap justify-content-center">
        {randomProducts.map((product) => (
          <div className="card m-3 " key={product._id} style={{ width: "280px", maxHeight: "600px", overflow: "hidden",boxShadow:"4px 3px 8px gold" }}>
            <img src={product.img} className="card-img-top" alt="Card" style={{ maxHeight: "400px" }} />
            <div className="card-body">
              <h5 className="card-title text-center fs-2">{product.name}</h5>
              <Link to={`/product/${product._id}`} className="text-light btn btn-dark d-block">Checkout {product.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
