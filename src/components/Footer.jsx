import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-4">
      <div className="container py-5">
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={500}>
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 text-center">
                <h3 className="mb-4">Connect with us</h3>
                <div className="social-icons">
                  <Link to="/" className="social-icon">
                    <FontAwesomeIcon icon={faFacebook} />
                  </Link>
                  <Link to="/" className="social-icon">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                  <Link to="/" className="social-icon">
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      <h1 className='text-center fs-2 mt-4'>Developed & Maintained By Yash Gupta</h1>
      </div>
    </footer>
  );
};

export default Footer;
