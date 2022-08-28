import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedPage/Loading';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Collect publishable Key from link: https://dashboard.stripe.com/test/apikeys

const stripePromise = loadStripe('pk_test_51LbSnRLHwpmroVsRQRIg2DK9wAyMETRbdOiloPfTor3pAXm5W401WEEhaKCbe6zj1B4m9WORxTkJxhpDHzifADYc000trTOUtx');

const Payment = () => {
    const {id}= useParams()
    const url = `http://localhost:5000/payment/${id}`
    const {data:booking,isLoading}= useQuery(['booking',id], ()=> fetch(url).then(res=>res.json()))

    if(isLoading){return <Loading/>}

    return (
       
        <>
        
        <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12 mx-auto">
        <div class="card-body">
            <p className=' card-title text-primary'>Hi, {booking.patientName}</p>
        <h4 class=" text-info">Please pay for "{booking.treatmentName} " </h4>
        <p className='text-warning'>Your Appointment: {booking.date} at {booking.slot}</p>
        <p className='font-bold'> Please Pay : ${booking.price}</p>
        </div>
        </div>
       
          
    <div>
    <div class="card w-50 max-w-md bg-secondary mx-auto shadow-xl">
    <div class="card-body">
    <Elements stripe={stripePromise}>
      <CheckoutForm booking={booking}/>
    </Elements>
  </div>
</div>
</div>
</>
    );
};

export default Payment;