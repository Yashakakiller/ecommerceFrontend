import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_CALL} from '../api'

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
    <div className=' mt-5' style={{background:"black" , padding:"5px" ,marginBottom:"10px"}}>
      <h1 className='text-center head1'>SHOP BY CATEGORY</h1>
      <div className="container d-flex flex-wrap justify-content-center">
        {data.length > 0 ? (
          data.map((category) => (
            <div className="card m-3 border-black" key={category._id} style={{width:"280px" ,maxHeight:"700px", overflow:"hidden"}}>
              <img src={category.img} className="card-img-top" alt="Card" style={{maxHeight:"400px"}}/>
              <div className="card-body">
                <h5 className="card-title text-center fs-2">{category.name}</h5>
                <Link to={`/products/byCategory/${category.name}`} className="text-light btn btn-warning d-block">Checkout {category.name}</Link>
              </div>
            </div>
          ))
        ) : (
          <h3>No Categories Found</h3>
        )}
      </div>
    </div>
  );
};

export default Categories;
