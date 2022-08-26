import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditDoctor = ({ doctorEdit, refetch, setDoctorEdit }) => {
  // console.log(doctorEdit.serviceName)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [allServiceName, setServiceName] = useState([]);
  useEffect(() => {
    fetch("https://floating-earth-43239.herokuapp.com/servicesName")
      .then((res) => res.json())
      .then((data1) => setServiceName(data1));
  }, []);

  const onSubmit = (data) => {
    //console.log(doctorEdit.serviceName)
    const newDoctorInfo = {
      serviceName: data.newService,
      preService: data.preService,
    };

    fetch(
      `https://floating-earth-43239.herokuapp.com/doctor/update/${doctorEdit.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newDoctorInfo),
      }
    )
      .then((res) => res.json())
      .then((data2) => {
        if (data2.modifiedCount > 0) {
          toast.success(" update done ");
        }
        refetch();
      });
    //console.log(newDoctorInfo)

    setDoctorEdit(null);
  };

  return (
    <div>
      <input type="checkbox" id="editDoctor" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            for="editDoctor"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          {/*   Edit Table start from here */}

          <div className="flex  justify-center justify-items-center">
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="text-center text-2xl font-bold">
                  Change Specialties!
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/*  Name input field */}

                  <div class="form-control w-full max-w-xs">
                    <label class="label">
                      <span class="label-text">Pre Specialties</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doctor Name"
                      class="input input-bordered w-full max-w-xs"
                      value={doctorEdit.serviceName}
                      {...register("preService", {
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

                  {/*  Service Name input field */}
                  <div class="form-control w-full max-w-xs">
                    <label class="label">
                      <span class="label-text">Post Specialties</span>
                    </label>
                    <select
                      type="text"
                      class="input input-bordered w-full max-w-xs"
                      {...register("newService", {
                        required: {
                          value: true,
                          message: " Service Name is required",
                        },
                      })}
                    >
                      {allServiceName.map((service) => (
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

                  <input
                    type="submit"
                    class="btn btn-accent w-full max-w-xs m-2"
                    value="Change Service"
                  />
                </form>
              </div>
            </div>
          </div>

          {/* <div class="modal-action">
      <button className='btn btn-info'
      onClick={()=>handleEdit(doctorEdit.email)}> Edit</button>
    </div>  */}
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
