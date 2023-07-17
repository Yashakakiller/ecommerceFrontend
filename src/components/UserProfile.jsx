import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_CALL } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: 400,
    margin: '0 auto',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  cardBody: {
    backgroundColor: '#000000',
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL}/accounts/user/singleuser/${id}`);
        const userData = response.data.user[0];
        if (response.data.success) {
          setAuth(true);
        }
        setUser(userData);
      } catch (error) {
        // Handle error
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
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      // Handle error
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      const response = await axios.post(`${API_CALL}/accounts/user`, { img: image, id: id });
      if (response.data.success) {
        const notify = () => toast(`${response.data.message} \n Please Reload the page`);
        notify();
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.post(`${API_CALL}/accounts/user/get`, { id: id });
        setImages(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchImages();
  }, []);

  const hideImage = () => {
    const inputt = document.getElementById('accept_image');
    inputt.style.display = 'none';
  };

  const deleteUser = async () => {
    const backend = await axios.delete(`${API_CALL}/accounts/user/delete/${id}`);
    localStorage.removeItem('token');
    navigate('/');
  };

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
      {localStorage.getItem('token') ? (
        <>
          {!auth ? (
            <>
              <div className="lds-hourglass center "></div>
              <h3 className="verifyh3">Please wait while we verify your authentication...</h3>
            </>
          ) : (
            <>
              <div className="container">
                <div className="row justify-content-center mt-5">
                  <div className="col-lg-8">
                    <div className={classes.container}>
                      <div
                        className="card-header"
                        style={{
                          backgroundColor: '#f44336',
                          color: '#ffffff',
                          borderRadius: '20px',
                        }}
                      >
                        <h3 className="text-center p-3 fs-2">User Profile</h3>
                      </div>
                      <div className={`${classes.cardBody} card-body p-4`}>
                        {user ? (
                          <>
                            <Grid container direction="column" alignItems="center" spacing={2}>
                              <Grid item>
                                {!user.img ? (
                                  <>
                                    <h3 className="text-light">You have not set a profile icon yet!</h3>
                                    <input
                                      accept="image/*"
                                      type="file"
                                      onChange={convert}
                                      id="accept_image"
                                      onClick={hideImage}
                                      style={{ display: 'none' }}
                                    />
                                    {image && (
                                      <>
                                        <br />
                                        <img width={200} src={image} alt="User" />
                                      </>
                                    )}
                                    <button
                                      className="btn btn-danger p-2"
                                      onClick={uploadImage}
                                      style={{ marginTop: '10px' }}
                                    >
                                      Set Profile Image
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <Avatar className={classes.avatar} alt={user.name} src={user.img} />
                                  </>
                                )}
                              </Grid>
                              <Grid item>
                                <Typography variant="h6" style={{ color: '#ffffff' }}>
                                  {`${user.firstName} ${user.lastName}`}
                                </Typography>
                              </Grid>
                              <Grid item container alignItems="center">
                                <EmailIcon className={classes.icon} style={{ color: '#ffffff' }} />
                                <Typography style={{ color: '#ffffff' }}>{user.email}</Typography>
                              </Grid>
                              <Grid item container alignItems="center">
                                <PhoneIcon className={classes.icon} style={{ color: '#ffffff' }} />
                                <Typography style={{ color: '#ffffff' }}>{user.phone}</Typography>
                              </Grid>
                              <Grid item container alignItems="center">
                                <LocationOnIcon className={classes.icon} style={{ color: '#ffffff' }} />
                                <Typography style={{ color: '#ffffff' }}>{user.address}</Typography>
                              </Grid>
                              <Grid item container alignItems="center">
                                <CalendarTodayIcon className={classes.icon} style={{ color: '#ffffff' }} />
                                <Typography style={{ color: '#ffffff' }}>
                                  {formatDate(user.dateofJoin)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <p className="text-light">Loading user data...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="container"
                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}
              >
                <Link className="btn btn-success m-2 text-light" to="/" style={{ backgroundColor: '#4caf50' }}>
                  Start Your Shopping
                </Link>
                <button
                  className="btn btn-secondary m-2 text-light"
                  onClick={deleteUser}
                  style={{ backgroundColor: '#888888' }}
                >
                  Delete Your Account
                </button>
                <Link
                  className="btn btn-primary m-2 text-light"
                  to={`/orders/user/${id}`}
                  style={{ backgroundColor: '#2196f3' }}
                >
                  Your Orders
                </Link>
              </div>
            </>
          )}
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
                    <Link to="/login" className="btn btn-secondary" style={{ backgroundColor: '#888888' }}>
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
