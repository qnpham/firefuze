import React from 'react';

function Message() {
  return (
    <div className="container">
      <div className="confirmation-container">
        <h2 className='thank-you'>Thank you!</h2>
        <p className='message' >Your order has successfully been processed. Your receipt along with your products have been sent to the provided email.</p>
      </div>
    </div>
  );
}
export default Message;
