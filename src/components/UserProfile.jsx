import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_CALL } from '../api';

const UserProfile = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [auth,setAuth] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const userData = response.data.user[0];
        // console.log()
        if(response.data.success){
          setAuth(true)
        }
        setUser(userData);
      } catch (error) {
      //  console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  };

  const convert = (e) => {
    var reader = new FileReader();
    reader.onload = () => {

      setImage(reader.result);
    };
    reader.onerror = (error) => {
     // console.log(error.message);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
     const response =  await axios.post(`${API_CALL}/accounts/user`, { img: image, id: id });;
     if(response.data.success){
      const notify = () => toast(`${response.data.message} \n Please Reload the page`)
      notify()
     }
     

    } catch (error) {
    //  console.log('Error uploading image:', error);
    }
  };


  useEffect(() => {
   
   
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${API_CALL}/accounts/user/get`, { id: id });
        setImages(response.data);
        
      } catch (error) {
     //   console.log('Error fetching images:', error);
      }
    };
    
   
    fetchImages();
  }, []);

  const hideImage = () => {
    const inputt = document.getElementById("accept_image");
    inputt.style.display = "none"
  }

  const deleteUser = async () => {
    const backend = await axios.delete(`${API_CALL}/accounts/user/delete/${id}`)
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <>
       <ToastContainer
position="top-center"
autoClose={4500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      {localStorage.getItem('token') && auth ? (
        <>
          <div className="container">
            <div className="row justify-content-center mt-5">
              <div className="col-lg-8">
                <div className="usercard useranimated fadeIn">
                  <div className="card-header bg-danger text-white" style={{
                      borderRadius:"20px"
                    }}>
                    <h3 className="text-center p-3 fs-2" >User Profile</h3>
                  </div>
                  <div className="card-body p-4"  style={{
                    background:"black"
                  }}>
                    {user ? (
                      <>
                        <div className="text-center">
                          {!user.img ? (
                            <>
                              <h3 className='text-light'>You have not set the Profile Icon Yet !!!</h3>
                              <input
                                accept="image/*"
                                className='btn btn-warning'
                                type="file"
                                onChange={convert}
                                id='accept_image'
                                onClick={hideImage}
                              />
                              {image !== "" && image !== null && <><br/><img width={200} src={image} alt="User" /></>}
                 
                              <button className='btn btn-danger p-2' onClick={uploadImage} >Set Profile Image</button>
                            </>
                          ) : (
                            <>
                          
                              <img className='finalImage' src={images} alt='' />
                            </>
                          )}
                        </div>
                        <div className="table-responsive mt-4">
                          <table className="table table-bordered table-striped">
                            <tbody>
                              <tr>
                                <th className='bg-danger'>Name</th>
                                <td>{user.firstName} {user.lastName}</td>
                              </tr>
                              <tr>
                                <th className='bg-danger'>Phone</th>
                                <td>{user.phone}</td>
                              </tr>
                              <tr>
                                <th className='bg-danger'>Gender</th>
                                <td>{user.gender}</td>
                              </tr>
                              <tr>
                                <th className='bg-danger'>Address</th>
                                <td>{user.address}</td>
                              </tr>
                              <tr>
                                <th className='bg-danger'>Email</th>
                                <td className="email">{user.email}</td>
                              </tr>
                              <tr>
                                <th className='bg-danger'>Date of Join</th>
                                <td>{formatDate(user.dateofJoin)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <p className='text-light'>Loading user data...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container" style={{ display: 'flex',flexWrap:"wrap", justifyContent: 'center' }}>
            <Link className="btn btn-success m-2 text-light" to="/">
              Start Your Shopping
            </Link>
            <button className="btn btn-secondary m-2 text-light"  onClick={deleteUser}>
              Delete Your Account
            </button>
            <Link className="btn btn-primary m-2 text-light" to={`/orders/user/${id}`}>
              Your Orders
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div className="row justify-content-center mt-5">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title fs-1">Please Login First</h5>
                    <p className="card-text fs-4">To access this page, you need to login to your account.</p>
                    <Link to="/login" className="btn btn-secondary">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
