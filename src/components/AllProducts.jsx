import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_CALL } from '../api'
import { Link } from 'react-router-dom'
// import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const AllProducts = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    const backend = await axios.get(
      `${API_CALL}/products/allproducts`,
      {
        params: {
          page: currentPage
        },
      }
    );
    setTotalPages(backend.data.totalPages);
    setProducts(backend.data.products);
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <section id="allProducts" className='section-p1'>
        <h2>All Products</h2>
        <p>Find Your Fashion</p>
        <div className="all_container">
          {products.map((product) => {
            return (
              <div className="all_box" key={product._id}>
                <img src={product.img} alt='featured image logo' />
                <div className="desc">
                  <h5>{product.name}</h5>
                  <h4>₹ {product.price}</h4>
                  {/* <h4>₹ {product.quantity}</h4> */}
                </div>
                
                <Link  to={`/product/${product._id}`}>View Product</Link>
              </div>
            );
          })}
        </div>
        {totalPages > 1 && (
          <div>
            <button className='btn btn-primary m-2'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className='btn btn-primary m-2'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        )}
      </section>
    </>
  )
}


export default AllProducts;
