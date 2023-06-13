import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_CALL } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const userData = response.data[0]; // Access the user profile data from index 0
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>

            {localStorage.getItem("token") ? (<><div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8">
            <div className="usercard useranimated fadeIn">
              <div className="card-header bg-primary text-white">
                <h3 className="text-center">User Profile</h3>
              </div>
              <div className="card-body">
                {user ? (
                  <div className="text-center">
                    <img src={user.img} alt="Profile" className="img-fluid rounded-circle profile-picture" />
                  </div>
                ) : (
                  <p>Loading user data...</p>
                )}

                <div className="table-responsive mt-4">
                  <table className="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{user ? user.firstName + " " + user.lastName : ""}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td>{user && user.phone}</td>
                      </tr>
                      <tr>
                        <th>Gender</th>
                        <td>{user && user.gender}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>{user && user.address}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td className="email">{user && user.email}</td>
                      </tr>
                      <tr>
                        <th>Date of Join</th>
                        <td>{user && formatDate(user.dateofJoin)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
   
            </div>
          </div>
        </div>
      </div>

        <div className="container" style={{display:"flex",justifyContent:"center"}}>
        <Link className='btn btn-success m-2 text-light' to="/">Start Your Shopping</Link>
        </div></>):(<>
        
            <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title fs-1">Please Login First</h5>
              <p className="card-text fs-4">To access this page, you need to login to your account.</p>
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
        
        </>)}

      

        </>
  );
};

export default UserProfile;
