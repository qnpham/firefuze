import React from 'react';
export default function emptyCart(props) {
  return (
    <div className="container">
      <div className="empty-cart-container">
        <p className='empty'>Your cart is empty!</p>
        <a href="#" className='return-message'>RETURN TO HOME</a>
      </div>
    </div>
  );
}
