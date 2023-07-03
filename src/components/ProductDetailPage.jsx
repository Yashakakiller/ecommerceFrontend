import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import RelatedProducts from './RelatedProducts';

const ProductsDetailPage = () => {
  const [quantity, setSelectedQuantity] = useState(1);
  const [user, setUser] = useState({ wishlist: [] });
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [relatedImages, setRelatedImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_CALL}/accounts/user/auth/user/details`,
          null,
          {
            headers: {
              token: `${localStorage.getItem("token")}`,
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

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleImageChange = (event) => {
      const mainImage = document.getElementById("mainImage");
      mainImage.src = event.target.src;
    };

    const images = Array.from(document.getElementsByClassName("small-img"));
    setRelatedImages(images);

    images.forEach((image) => {
      image.addEventListener("click", handleImageChange);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("click", handleImageChange);
      });
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_CALL}/products/product/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${API_CALL}/wishlist/user/${user._id}`,
        { _id: productId }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToCart = async (_id, quantity) => {
    try {
      const response = await axios.post(
        `${API_CALL}/cart/user/${user._id}`,
        { _id, quantity }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  

  return (
    <>
      <section className='container sproduct  mb-5 pt-5'>
        <div className='row mt-5'>
          <div className='col-lg-5 col-md-12 col-12'>
            <img alt='' src={product.img} className='mainImage pb-1 img-fluid' id='mainImage'/>

            <div className='small-img-group'>
              <div className="small-img-col">
                <img className='small-img' alt="" src="https://i.pinimg.com/564x/5c/4f/6e/5c4f6e0e335a59340a023553a95c9d1b.jpg" />
              </div>
              <div className="small-img-col">
                <img className='small-img' alt="" src="https://rukminim1.flixcart.com/image/550/650/l3uhvgw0/t-shirt/g/j/w/m-ustshs1091-u-s-polo-association-original-imagevkhzmfthut4.jpeg?q=90&crop=false" />
              </div>
              <div className="small-img-col">
                <img className='small-img' alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiJ9YqIZNg7WunugNcLh9VKAs6Jtg875t3A" />
              </div>
              <div className="small-img-col">
                <img className='small-img' alt="" src={product.img} />
              </div>
            </div>
          </div>

          <div className='col-lg-6 col-md-12 col-12 p-desc'>
            <h6>{product.category}</h6>
            <h3 className='py-4'>{product.name}</h3>
            <h2>₹{product.price}</h2>
          {product.quantity == 0 || product.quantity == null ? (<h3 className='text-danger'>Out of Stock !</h3>) : (<>  <h4>Select Quantity</h4>
            <select className='my-3' value={quantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}>
              {Array.from({ length: product.quantity }, (_, i) => i + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <button className='buy-btn mx-2' onClick={() => addToCart(product._id, quantity)}>
              Add To Cart
            </button>
            <button className='buy-btn' onClick={() => addWishlist(product._id)}>
              Add To Wishlist
            </button></>)}
            <h4 className='mt-5 mb-5'>Product Details</h4>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quisquam animi nostrum.
              Ducimus dignissimos quam, harum sed doloremque distinctio aliquam porro beatae laborum
              tempora ad nostrum itaque expedita veritatis, esse dolorem fuga commodi provident ipsam!
              Saepe vero hic exercitationem laboriosam assumenda. Quo, repellendus! Suscipit consectetur
              labore, ipsum tenetur quod ad amet! Similique assumenda eaque delectus deleniti autem nulla.
              Magnam atque veritatis illum perspiciatis commodi, voluptas excepturi ullam neque dolore ipsam?
            </span>
          </div>
        </div>
        <RelatedProducts id={product._id} />
      </section>
    </>
  );
};

export default ProductsDetailPage;
