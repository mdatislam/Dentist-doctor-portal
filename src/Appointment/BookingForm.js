import React from 'react';

const BookingForm = ({booking, setBooking}) => {
    const {name}= booking
    console.log(name)
    return (
        <>

<input type="checkbox" id="Booking-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg"> Booking for {name}</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div class="modal-action">
      <label for="Booking-modal" class="btn btn-outline btn-primary">Cancel</label>
      <label for="Booking-modal" class="btn btn-outline btn-error">Confirm</label>
    </div>
  </div>
</div>
</>
    );
};

export default BookingForm;