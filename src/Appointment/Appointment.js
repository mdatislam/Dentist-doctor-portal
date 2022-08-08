import React, { useState } from 'react';
import AppointmentBannar from './AppointmentBannar';
import AvailableAppointment from './AvailableAppointment';
import 'react-day-picker/dist/style.css';


const Appointment = () => {
    const [date, setDate]= useState(new Date())
    return (
        <div>
            <AppointmentBannar key={date.index} date={date} setDate={setDate}/>
            <AvailableAppointment  date={date}  />
        </div>
    );
};

export default Appointment;