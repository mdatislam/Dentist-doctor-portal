import React from 'react';
import icon1 from '../assets/icons/clock.svg'
import icon2 from '../assets/icons/marker.svg'
import icon3 from '../assets/icons/quote.svg'
import icon4 from '../assets/icons/phone.svg'
import Card from './Card';

const CardInfo = () => {
    const icons = [
        {head: 'icon1 head', body:'icon1 msg', img:icon1,bgClass:'bg-primary'},
        {head: 'icon2 head', body:'icon2 msg', img:icon2,bgClass:'bg-secondary'},
        {head: 'icon3 head', body:'icon3 msg', img:icon4,bgClass:'bg-accent'}
    ]

    return (
        <>
        <div className='mt-20 bg-base-300 grid grid-cols-1 md:grid-cols-3 gap-x-4'>
        {
            icons.map(icon=> <Card icon={icon}></Card>)
        }
        </div>
        </>
        
    );
};

export default CardInfo;