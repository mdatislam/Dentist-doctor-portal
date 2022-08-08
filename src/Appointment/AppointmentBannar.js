import React, { useState } from 'react';
import chair from '../assets/images/chair.png'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBannar = ({date,setDate,key}) => {
    

    /* let footer = <p>Please pick a day.</p>;
    if (date) {
      footer = <p>You picked {format(date, 'PP')}.</p>;
    } */
    return (
        <div class="hero min-h-screen ">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <img src={chair} class="max-w-sm rounded-lg shadow-2xl" />
    
    <div>
    <DayPicker
    mode="single"
    selected={date}
    onSelect={setDate}
   
      />
      <p>You picked {format(date, 'PP')}.</p>;
    </div>
  </div>
</div>
    );
};

export default AppointmentBannar;