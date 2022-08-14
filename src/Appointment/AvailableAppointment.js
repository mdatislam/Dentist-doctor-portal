import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Loading from '../SharedPage/Loading';
import BookingForm from './BookingForm';
import Service from './Service';

const AvailableAppointment = ({date}) => {
   // const [services, setService]= useState([])
    const [booking, setBooking] = useState(null)
    const formatedDate = format(date,"PP")

    const {isLoading, data:services,refetch}=useQuery(['Available',formatedDate],() =>  fetch(`http://localhost:5000/available?date=${formatedDate}`)
    .then(res=> res.json()))

    if(isLoading){
        return <Loading/>
    }


    /* useEffect(()=>{
        fetch(`http://localhost:5000/available?date=${formatedDate}`)
        .then(res=> res.json())
        .then(data=> setService(data))
    },[formatedDate]) */
    return (
        <div className='text-center text-primary'>
            Available AppointMent on {format(date, 'PP')}
            <div className='mt-20 bg-base-300 grid grid-cols-1 md:grid-cols-3 gap-4'>
                {
                    services.map(service=> <Service
                    key={service.index}
                    service={service}
                    //setService={setService}
                    setBooking={setBooking}
                    
                    ></Service>)
                }
            </div>
            {
                booking && <BookingForm booking={booking} 
                setBooking={setBooking} 
                service={services}
                refetch={refetch}
                date={date} />
            }
        </div>
    );
};

export default AvailableAppointment;