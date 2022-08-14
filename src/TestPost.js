import React from 'react';
import { initializeApp } from 'firebase/app';

const TestPost = () => {
    const handleSubmit=(event)=>{
        event.preventDefault()
        const email = event.target.email.value
        console.log(email)
        const book={
            email,
        }
        fetch("http://localhost:5000/user",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
    }
    return (
        <div className='mt-16'>
           <form onSubmit={handleSubmit}>
           <input
                type="email"
                name="email"
                placeholder="Your Email"
                class="input input-bordered w-full max-w-xs"/>
            <input className="btn btn-info ml-4"
            type="submit" value="Submit"/>
           </form>
        </div>
    );
};

export default TestPost;