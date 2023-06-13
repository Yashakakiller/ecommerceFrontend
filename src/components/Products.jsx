import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_CALL } from '../api';

const Products = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  // console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const backend = await axios.get(`${API_CALL}/products/byCategory?category=${category}`);
        setData(backend.data.products);
        console.log(backend)

      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
              <div className="container" >
      <h2 className="text-center mb-4 head3">Our Products</h2>
      <div className="row" >
    
      {data.length > 0 ? (
        data.map((product) => {
          return (
            <React.Fragment key={product._id}>




        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: "20rem", maxHeight: "760px",boxShadow:"3px 3px 10px black" }}>
            <img
              src={product.img}
              className="card-img-top"
              alt="Product"
              style={{ height: "420px", objectFit: "fill" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.desc}</p>
              <p className="card-price">₹ <b>{product.price}</b></p>
              <a href="#" className="btn btn-primary">Buy Now</a>
            </div>
          </div>
        </div>


            </React.Fragment>
          );
        })
        ) : (

        <>No Products Available</>
      )}
              
              </div>
      </div>
    </>
  );
};

export default Products;
