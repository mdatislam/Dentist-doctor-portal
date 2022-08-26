import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const EditDoctor = ({doctorEdit,refetch,setDoctorEdit}) => {
    console.log(doctorEdit.serviceName)
    const {
        register,
        reset,formState: { errors },
        handleSubmit,
      } = useForm();
      const [allServiceName, setServiceName]= useState([])
      useEffect(()=>{
        fetch('http://localhost:5000/servicesName')
        .then(res => res.json())
        .then(data1=> setServiceName(data1))

    },[])
   

    const onSubmit = async (data) =>{
        console.log(doctorEdit.serviceName)
        const newDoctorInfo={
            newService:data.newService,
            preService:data.preService

        }
        console.log(newDoctorInfo)

    }
   
    return (
        <div>
<input type="checkbox" id="editDoctor" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
  <label for="editDoctor" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

 {/*   Edit Table start from here */}

    <div className="flex  justify-center justify-items-center">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="text-center text-2xl font-bold">Change Service Name!</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

           {/*  Name input field */}

           <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Previous Service</span>
              </label>
              <input
                type="text"
                class="input input-bordered w-full max-w-xs"
                value={doctorEdit.serviceName}
                disabled
                {...register("preService",{
                    required: {
                      value: true,
                      message: " Service Name is required",
                    },
                  })}>{doctorEdit.serviceName}
                    
                </input>
              
            </div>

            

            {/*  Service Name input field */}
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">New Service Name</span>
              </label>
              <select
                type="text"
                class="input input-bordered w-full max-w-xs"
                {...register("newService", {
                  required: {
                    value: true,
                    message: " Service Name is required",
                  },
                })}>
                    {
                        allServiceName.map(service=> <option value= {service.name}>{service.name}</option> )
                    }
                   
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
             
              value='Change Service'
            
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