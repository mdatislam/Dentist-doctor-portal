import React from 'react';

const Card = ({icon}) => {
    return (
        <div class={`card card-side shadow-xl m-2 px-3 ${icon.bgClass}`}>
        <figure>
          <img src={icon.img} className="w-15" alt="Movie"/>
      
          </figure>
        <div class="card-body text-white">
          <h2 class="card-title">{icon.head}</h2>
          <p>{icon.body}</p>
          
        </div>
      </div>
    );
};

export default Card;