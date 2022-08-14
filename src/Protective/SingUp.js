import React from "react";
import {
    useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "./../firebase.init";
import { useForm } from "react-hook-form";
import { NavLink,useNavigate } from "react-router-dom";
import Loading from "../SharedPage/Loading";

const SingUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
      const navigate = useNavigate()
 
    const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading || gLoading || updating) return <Loading></Loading>

  let signInError
  if(error || gError || updateError){
  signInError = <p className=" text-red-500"><small>{error?.message || gError?.message ||updateError?.message  }</small></p>
  }

  const onSubmit = async (data) =>{
    ///console.log(data);
    await createUserWithEmailAndPassword(data.email, data.password)
    await updateProfile({ displayName:data.name });
    alert('Updated profile');
    navigate('/Appointment')

  } 

  
  if (user || gUser) {
    console.log(user || gUser);
  }
    return (
        <div className="flex  justify-center justify-items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Register Here Now!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

           {/*  Name input field */}

           <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                class="input input-bordered w-full max-w-xs"
                {...register("name", {
                  required: {
                    value: true,
                    message: " Name is required",
                  },
                })}
              />
              <label class="label">
                {errors.name?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

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
            {signInError}
            <input
              type="submit"
              value="Register"
              class="btn btn-accent w-full max-w-xs m-2"
            />
          </form>
          <small>Have Account ? <NavLink className='text-primary font-bold' to='/Login'>Go to Login</NavLink> </small>

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

export default SingUp;