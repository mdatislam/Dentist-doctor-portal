import React from 'react';
import { format } from 'date-fns';

const BookingForm = ({booking, setBooking,date}) => {
    const {name,slots}= booking
    //console.log(name)

    const handleSubmit= event => {
      event.preventDefault()
      const date = event.target.date.value 
      const slot = event.target.slot.value 
      const name = event.target.name.value 
      const mobile = event.target.mobile.value 
      console.log(date,slot,name,mobile)
      setBooking(null)
    }
    return (
        <>

<input type="checkbox" id="Booking-modal" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
  <label for="Booking-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="font-bold text-lg"> Booking for {name}</h3>
    <form onSubmit={handleSubmit}>
    <input type="text" name='date' value={format(date, 'PP')} disabled placeholder="Date" class="input input-bordered w-full max-w-xs" />
    <select name='slot' class="select select-bordered w-full max-w-xs">
    {
      slots.map(slot=> <option value={slot}>{slot}</option>)
    }
</select>
    <input type="text"  name= 'name' placeholder="Your name" class="input input-bordered w-full max-w-xs" />
    <input type="email" placeholder="email" class="input input-bordered w-full max-w-xs" />
    <input type="text" name='mobile' placeholder="Mobile" class="input input-bordered w-full max-w-xs" /> <br/>
    <input type="submit" value='submit'  class="btn btn-secondary input-bordered w-full max-w-xs mt-3" />
    </form>
    <div class="modal-action">
   {/*    <label for="Booking-modal" class="btn btn-outline btn-primary">Cancel</label>
      <label for="Booking-modal" class="btn btn-outline btn-error">Confirm</label> */}
    </div>
  </div>
</div>
</>
    );
};

export default BookingForm;