import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';
import Service from './Service';

const AvailableAppointment = ({date}) => {
    const [services, setService]= useState([])
    const [booking, setBooking] = useState("")
    useEffect(()=>{
        fetch('Service.json')
        .then(res=> res.json())
        .then(data=> setService(data))
    },[])
    return (
        <div className='text-center text-primary'>
            Available AppointMent on {format(date, 'PP')}
            <div className='mt-20 bg-base-300 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {
                    services.map(service=> <Service
                    key={service.index}
                    service={service}
                    setService={setService}
                    setBooking={setBooking}
                    
                    ></Service>)
                }
            </div>
            {
                booking && <BookingForm booking={booking} setBooking={setBooking} />
            }
        </div>
    );
};

export default AvailableAppointment;