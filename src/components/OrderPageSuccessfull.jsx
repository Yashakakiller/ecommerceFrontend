import React, { useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

import { Link } from 'react-router-dom';

const OrderPageSuccessfull = () => {
  const successContainerRef = useRef(null);

  return (
    <>
      <div>
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade" nodeRef={successContainerRef}>
          <div ref={successContainerRef} className="order-success-container bg-light p-5 text-center">
            <div className="order-success-icon text-success">
              <FaCheckCircle size={64} />
            </div>
            <h2 className="order-success-heading mt-4">Order Placed Successfully!</h2>
            <p className="order-success-message mt-3">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>
        </CSSTransition>
        <Link to='/' className='btn btn-primary d-block m-auto w-50'>Continue Shopping</Link>
      </div>
    </>
  );
}

export default OrderPageSuccessfull;
