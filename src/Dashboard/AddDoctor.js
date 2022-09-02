import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Loading from "../SharedPage/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /*  const { data:services, isLoading } = useQuery('serviceName', () => fetch('https://floating-earth-43239.herokuapp.com/servicesName').then(res => res.json()))
   // console.log(services)
    if(isLoading)
    { return <Loading/>} */

  const [serviceName, setServiceName] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://floating-earth-43239.herokuapp.com/servicesName")
      .then((res) => res.json())
      .then((data1) => setServiceName(data1));
  }, []);

  const handleImageUpload = (event) => {
    setLoading(true);
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageBbKey = "8c57d043d4f3465d6761993e6f667e3a";
    const url = `https://api.imgbb.com/1/upload?key=${imageBbKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data2) => {
        setImageUrl(data2.data.display_url);
        setLoading(false);
        //console.log(data2.data.display_url)
      });
  };

  const onSubmit = async (data) => {
    const doctorInfo = {
      name: data.name,
      email: data.email,
      serviceName: data.service,
      image: imageUrl,
    };
    //console.log(doctorInfo)

    fetch("https://floating-earth-43239.herokuapp.com/doctorInfo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(doctorInfo),
    })
      .then((res) => res.json())
      .then((upload) => {
        if (upload.insertedId) {
          toast.success(`Doctor ${data.name} successfully uploaded`);
        }

        setImageUrl("");
        reset();
      });
  };

  return (
    <div className="flex  justify-center justify-items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Add New Doctor!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  Name input field */}

            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Doctor Name"
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
                placeholder="Doctor Email"
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

            {/*  Service Name input field */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Service Name</span>
              </label>
              <select
                type="text"
                class="input input-bordered w-full max-w-xs"
                {...register("service", {
                  required: {
                    value: true,
                    message: " Service Name is required",
                  },
                })}
              >
                {serviceName.map((service) => (
                  <option value={service.name}>{service.name}</option>
                ))}
              </select>
              <label class="label">
                {errors.password?.type === "required" && (
                  <span class="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            {/*   photo upload field */}
            <div class="form-control w-full max-w-xs">
              <label
                htmlFor="imageUpload"
                class={
                  loading
                    ? "btn  btn-success loading mt-1"
                    : "btn btn-outline btn-info mt-1"
                }
              >
                Upload Image
                {/*  <span class="label-text text-center text-white">Upload Image</span> */}
              </label>
              <input
                id="imageUpload"
                type="file"
                name="photo"
                class="input input-bordered w-full max-w-xs hidden"
                onChange={handleImageUpload}
              ></input>
            </div>

            <input
              type="submit"
              disabled={!imageUrl ? true : false}
              class="btn btn-accent w-full max-w-xs m-2"
              value="ADD"
              /*   <button class="btn btn-success">Success</button> */
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
