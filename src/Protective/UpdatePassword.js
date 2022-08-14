import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSendPasswordResetEmail, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from './../firebase.init';
import Loading from './../SharedPage/Loading';

const UpdatePassword = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      //const [email, setEmail] = useState('');
      const [sendPasswordResetEmail, passUpdating,passError] = useSendPasswordResetEmail(
        auth
      );

      if (passUpdating) return <Loading></Loading>

  let signInError
  if(errors || passError){
  signInError = <p className=" text-red-500"><small>{passError?.message}</small></p>
  }

  const onSubmit = async(data) =>{
    //const email = setEmail(data.email)
    const email = data.email
    await sendPasswordResetEmail(email);
    alert(' Check your email to get Password Reset link');
    
  } 


    return (
        <div className="flex  justify-center justify-items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Update Password!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  email input field */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Please input your Email"
                class="input input-bordered w-full max-w-xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: " Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label class="label">
                {errors.email?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span class="label-text-alt  text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            
              
            {signInError}
            <input
              type="submit"
              value="Update Password"
              class="btn btn-accent w-full max-w-xs m-2"
            />
          </form>
         

          
        </div>
      </div>
    </div>
    );
};

export default UpdatePassword;