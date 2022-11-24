import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

function Stripe(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async event => {

    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }
    props.createOrder();
    const { error } = await stripe.confirmPayment({

      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#confirmation`
      }
    });

    if (error) {

      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <div className='final-checkout-btn-container'>
            <button disabled={!stripe} className="final-checkout-btn">CHECKOUT</button>
          </div>
          {/* Show error message to your customers */}
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
}

export default Stripe;
