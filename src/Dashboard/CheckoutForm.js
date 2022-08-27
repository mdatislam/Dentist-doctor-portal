import React, { useState } from 'react';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// source of this code is :  https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js



const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError]= useState()

    const handleSubmit= async (event) =>{
        event.preventDefault()

        if (!stripe || !elements) {
            return;
          }

        const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
        setCardError(error.message)
      } 
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-info btn-sm mt-4' type="submit" disabled={!loadStripe}>
          Pay
        </button>
      </form>
      {
        cardError && <p className='text-red-500'>{cardError}</p>
      }
      </>
    );
};

export default CheckoutForm;