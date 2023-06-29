import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_CALL } from '../api';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Categories from './Categories';
import RandomProducts from './RandomProducts';
import { MyContext } from '../Context';

const Search = () => {
  const [user, setUser] = useState([]);
  const { sharedData, updateSharedData } = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/searchproduct/name`, {
        params: { query: searchTerm },
      });
      setSearchResults(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    resetSearchResults();
  };

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_CALL}/wishlist/user/${user._id}`,
        { _id: productId }
      );
      updateSharedData(user.wishlist.length + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="d-flex mt-4">
        <input
          style={{ display: 'block', width: '50%', margin: '0 auto', padding: '10px', backgroundColor: 'black', color: 'yellow' }}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter the Product Name"
        />
        {searchTerm === '' || searchTerm === null ? (
          <></>
        ) : (
          <>
            <button
              className="btn btn-primary mx-2"
              onClick={handleSearch}
              style={{ backgroundColor: 'black', position: 'relative', right: '150px' }}
            >
              Search
            </button>
          </>
        )}
      </div>

      {searchTerm === null || searchTerm === '' || searchTerm === ' ' ? (
        <>
          <Categories />
          <RandomProducts />
        </>
      ) : (
        <>
          {searchResults.length !== 0 ? (
            <div className="d-flex flex-wrap m-4 p-2">
              {searchResults.map((product) => {
                return (
                  <React.Fragment key={product._id}>
                    <div className="col-md-4 mb-4">
                      <div
                        className="card"
                        style={{
                          width: '20rem',
                          maxHeight: '760px',
                          boxShadow: '3px 3px 10px black',
                        }}
                      >
                        <img
                          src={product.img}
                          className="card-img-top"
                          alt="Product"
                          style={{ height: '420px', objectFit: 'fill' }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-price">
                            ₹ <b>{product.price}</b>
                          </p>

                          {product.quantity === 0 || product.quantity === null ? (
                            <p className="text-danger">Out of Stock .. Will Back Soon !!!</p>
                          ) : (
                            <>
                              {product.quantity >= 1 && product.quantity <= 5 ? (
                                <p className="text-danger">Hurry only few products left</p>
                              ) : null}
                            </>
                          )}

                          {localStorage.getItem('token') && (
                            <button
                              className="w-50 btn btn-primary d-block my-3 mx-auto"
                              onClick={() => {
                                addWishlist(product._id);
                              }}
                            >
                              Add to Wishlist
                            </button>
                          )}
                          <Link to={`/product/${product._id}`} className="w-100 my-2 btn btn-secondary">
                            View Product
                          </Link>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <>
              <h1>No products found</h1>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Search;
