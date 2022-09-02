import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../firebase.init";
import { toast } from "react-toastify";

const BookingForm = ({ booking, setBooking, date, refetch }) => {
  const { name, slots, price } = booking;
  //console.log(name)
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formatDate = format(date, "PP");
    const slot = event.target.slot.value;
    const newBooking = {
      //treatmentId: _id,
      treatmentName: name,
      date: formatDate,
      slot,
      price,
      patientName: user.displayName,
      patientEmail: user.email,
      mobile: event.target.mobile.value,
    };
    //console.log(newBooking)
    fetch("https://floating-earth-43239.herokuapp.com/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.booking);
        if (data.success) {
          toast(`Appointment set on ${data.booking.date}`, {
            position: "top-center",
            theme: "colored",
            type: "success",
          });
          //alert(`Appointment set on ${data.booking.date}`)
        } else {
          alert(`you already have a appointment on  ${data.booking.date}`);
        }
        refetch();
      });

    setBooking(null);
  };
  return (
    <>
      <input type="checkbox" id="Booking-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="Booking-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg"> Booking for {name}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="date"
              value={format(date, "PP")}
              disabled
              placeholder="Date"
              class="input input-bordered w-full max-w-xs"
            />
            <select name="slot" class="select select-bordered w-full max-w-xs">
              {slots.map((slot) => (
                <option value={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={user.displayName}
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="numbet"
              value={price}
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              value={user.email}
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              class="input input-bordered w-full max-w-xs"
            />{" "}
            <br />
            <input
              type="submit"
              value="submit"
              class="btn btn-secondary input-bordered w-full max-w-xs mt-3"
            />
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
