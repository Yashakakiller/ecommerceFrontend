import React from 'react';
import {BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs'
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
   <>
    <footer id='footer' className='section-p1'>
      <div className="col">
        <img className='flogo' src="/logo-white.png" alt='logo' style={{width:"80px"}}/>
        <h4>Contact</h4>
        <p><strong>Address</strong> 44 Jawahar Colony Tonk Road Jaipur</p>
        <p><strong>Phone</strong> +91 0000000000</p>
        <p><strong>Hours</strong> 24 Hours Available</p>
        <p><strong>Email</strong> yashakakiller@gmail.com</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <BsFacebook onClick={()=> navigate("https://www.facebook.com/profile.php?id=100091975647443")}/>
            <BsTwitter onClick={() => navigate("https://twitter.com/yashakakiller")}/>
            <BsInstagram onClick={() => navigate("https://www.instagram.com/npm_x_yarn/")}/>
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <Link to="/">About Us</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Contact Us</Link>
        <Link to="/">Terms & Conditions</Link>
      </div>
      <div className="col">
        <h4>About</h4>
        <Link to="/">About Us</Link>
        <Link to="/">Privacy Policy</Link>
        <Link to="/">Contact Us</Link>
        <Link to="/">Terms & Conditions</Link>
      </div>
      
      <div className="copyright">
        <h4>Payment Gateways</h4>
       <img src="https://raw.githubusercontent.com/tech2etc/Build-and-Deploy-Ecommerce-Website/main/img/pay/pay.png" />
      </div>
    </footer>
   </>
  );
};

export default Footer;
