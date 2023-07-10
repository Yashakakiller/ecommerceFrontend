import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_CALL } from '../api';

const Categories = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/categories/allcategories`);
      setData(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <section id="categories" className='section-p1'>
        <h2>Categories we Offer</h2>
        {data.map((cgty) => (
          <div className='cgty_box' key={cgty._id}>
            <img src={cgty.img} alt='category image' />
            <Link to={`/products/byCategory/${cgty.name}`}><h6>{cgty.name}</h6></Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default Categories;
