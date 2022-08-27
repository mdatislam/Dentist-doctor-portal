import { setDefaultOptions } from 'date-fns';
import React from 'react';
import useState from 'react';
import BookingForm from './BookingForm';

const Service = ({service,setBooking}) => {
   
  
    return (
        <div class="card w-96 bg-base-100 shadow-xl m-2 px-2">
        <div class="card-body">
          <h2 class="card-title text-center">{service.name}</h2>
          <p>
            {service.slots[0]}
          </p>
          <p>{service.slots.length} {service.slots.length>0 ? 
          'spaces available': <span className='text-secondary'>Try another day</span>}</p>
          <p><small>Investigation fees:<strong>${service.price}</strong></small></p>
          <div class="card-actions justify-center">
            <label 
           
            for= "Booking-modal"
            disabled={service.slots.length>0 ? false:true}
            class="btn modal-button"
            onClick={()=>setBooking(service)}
           >Booking
           </label>
          </div>
        </div>
       
      </div>
    );
};

export default Service;