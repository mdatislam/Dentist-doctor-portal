import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../SharedPage/Loading';
import DoctorRow from './DoctorRow';
import ConfirmDoctorDel from './ConfirmDoctorDel';
import EditDoctor from './EditDoctor';

const ManageDoctor = () => {
    const [doctorDel,setDoctorDel]=useState([])
    const [doctorEdit,setDoctorEdit]=useState([])

    const {data:doctors,isLoading,refetch} = useQuery(['doctorList'],()=> fetch('http://localhost:5000/doctorList').then(res=>res.json()))

    if(isLoading){ return <Loading/>}

   // console.log(doctors)
 
    return (
        <div class="overflow-x-auto w-full">
        <table class="table w-full border border-blue-500"> 
         {/*  <!-- head --> */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              
              <th>Name</th>
              <th>Email</th>
              <th>Specialist</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
          {/*   <!-- row 1 --> */}
          {
            doctors.map(doctor => <DoctorRow
            key={doctor._id}
            doctor={doctor}
            setDoctorDel={setDoctorDel}
            doctorEdit={doctorEdit}
            setDoctorEdit={setDoctorEdit}
            refetch={refetch}
            ></DoctorRow>)
          }
            
          </tbody>
          
          
        </table>
        {
            doctorDel && <ConfirmDoctorDel
            doctorDel={doctorDel}
            setDoctorDel={setDoctorDel}
            refetch={refetch}></ConfirmDoctorDel>
        }

        {
            doctorEdit && <EditDoctor
            doctorEdit={doctorEdit}
            setDoctorEdit={setDoctorEdit}
            refetch={refetch}></EditDoctor>
        }
      </div>
    );
};

export default ManageDoctor;