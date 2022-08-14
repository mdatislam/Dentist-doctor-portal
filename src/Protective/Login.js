import React, { useState } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  
} from "react-firebase-hooks/auth";
import auth from "./../firebase.init";
import { useForm } from "react-hook-form";
import { Link,useLocation,useNavigate } from "react-router-dom";
import Loading from "../SharedPage/Loading";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
   

   

    const location = useLocation()
const navigate= useNavigate()
 
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading || gLoading)  return <Loading></Loading>

  let signInError
  if(error || gError){
  signInError = <p className=" text-red-500"><small>{error?.message || gError?.message}</small></p>
  }

  const onSubmit = (data) =>{
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password)
  } 



let from = location.state?.from?.pathname || '/Home'
  
  if (user || gUser) {
    console.log(user);
    navigate(from,{replace:true})
  }
  return (
    <div className="flex  justify-center justify-items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Login!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  email input field */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
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

            {/*  password input field */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Put password"
                class="input input-bordered w-full max-w-xs"
                {...register("password", {
                  required: {
                    value: true,
                    message: " Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 or more character",
                  },
                })}
              />
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span class="label-text-alt  text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <small><Link  className='text-primary font-bold' to='/UpdatePass'>Forget Password ?</Link></small>
           
              
            {signInError}
            <input
              type="submit"
              value="Login"
              class="btn btn-accent w-full max-w-xs m-2"
            />
          </form>
          <small>New to Dentist ? <Link  className='text-primary font-bold' to='/SignUp'>Register to Dentist</Link> </small>

          <div class="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            class="btn btn-outline btn-secondary"
          >
            Sign with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
