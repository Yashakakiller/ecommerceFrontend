import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_CALL } from '../api';

const Categories = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data)
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/categories/allcategories`);
      setData(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    // <div className='mt-5' style={{ padding: "5px", marginBottom: "10px" }}>
    //   <h1 className='text-center head1'>SHOP BY CATEGORY</h1>
    //   <div className="container d-flex flex-wrap justify-content-center">
    //     {data.length > 0 ? (
    //       <>
    //         {data.map((category) => (
    //           <div
    //             className="card m-3"
    //             key={category._id}
    //             style={{ width: "280px", maxHeight: "700px", overflow: "hidden",boxShadow:"2px 2px 10px black" }}
    //           >
    //             <img src={category.img} className="card-img-top" alt="Card" style={{ maxHeight: "400px" }} />
    //             <div className="card-body">
    //               <h5 className="card-title text-center fs-2">{category.name}</h5>
    //               <Link to={`/products/byCategory/${category.name}`} style={{ background: "#b99835" }} className="text-light btn  d-block">
    //                 Checkout {category.name}
    //               </Link>
    //             </div>
    //           </div>
    //         ))}
    //       </>
    //     ) : (
    //       <h3>No Categories Found</h3>
    //     )}
    //   </div>
    // </div>

    <>
      <section id="categories" className='section-p1'>
        <h2>Categories we Offer</h2>
        {data.map((cgty) => {
          return (
            <>
              <div className='cgty_box'>
                <img src={cgty.img} style={{width:"150px"}} alt='category image' />
                <Link to={`/products/byCategory/${cgty.name}`}><h6>{cgty.name}</h6></Link>
              </div>
            </>
          )
        })}
      </section>
    </>
  );
};

export default Categories;
