import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_CALL } from '../api';



const Products = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [user, setUser] = useState([]);
  const [auth , setAuth] = useState(false);

  
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
        if(response.data.success){
          setAuth(true)
        }
        setUser(response.data.data);
      } catch (error) {
      //  console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const backend = await axios.get(
          `${API_CALL}/products/byCategory?category=${category}`,
          {
            params: {
              page: currentPage
            },
          }
        );
        setTotalPages(backend.data.totalPages);
        setData(backend.data.products);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchData();
  }, [category, currentPage]);

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_CALL}/wishlist/user/${user._id}`,
        { _id: productId }
      );
      // console.log(response.data);

      
    } catch (error) {
  //    console.log(error.message);
    }
  };

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
      <div>
        <h2 className="text-center m-4 head3">Our Products</h2>
        <div className='p_all_box_container'>
          {data.length > 0 ? (
            data.map((product) => {
              return (
                <React.Fragment key={product._id}>
                  <div>
                    <div className='p_all_box'>
                      <img
                        src={product.img}
                        className="card-img-top"
                        alt="Product"
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center">{product.name}</h5>
                        <p className="card-price text-center">
                          ₹ <b>{product.price}</b>
                        </p>

                        {product.quantity == 0 || product.quantity == null ? (
                          <p className="text-danger ">
                            Out of Stock .. Will Back Soon !!!
                          </p>
                        ) : (
                          <>
                            {product.quantity >= 1 && product.quantity <= 5 ? (
                              <p className="text-danger">
                                Hurry only few products left
                              </p>
                            ) : null}
                          </>
                        )}

                       {localStorage.getItem("token") && auth ? (<> <button
                          className="c_add_t_w "
                          onClick={() => {
                            addWishlist(product._id);
                          }}
                        >
                          Add to Wishlist
                        </button></>):(<></>)}
                        <Link
                          to={`/product/${product._id}`}
                          className="w-100 my-2 btn btn-secondary"
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div>No Products Available</div>
          )}
        </div>

            {totalPages > 1 ? (<> <div>
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
        </div></>) : (<></>)}
       
      </div>

      
    </>
  );
};

export default Products;
