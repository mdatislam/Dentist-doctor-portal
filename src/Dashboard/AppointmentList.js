import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuth, signOut } from 'firebase/auth';
import auth from '../firebase.init';
import Loading from '../SharedPage/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AppointmentList = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const {data,isLoading} = useQuery(["List"], () =>
    fetch(`http://localhost:5000/appointmentList?email=${user.email}`,{
      method:"GET",
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
    })
    .then(res=>{
      if(res.status=== 401 || res.status=== 403){
        signOut(auth)
        localStorage.removeItem('accessToken')
        navigate("/Home")
      }
      return res.json()
    }))

    if(isLoading){
        return <Loading/>
    }
    console.log(data)
    return (
        <div>
            <div class="overflow-x-auto">
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>S/N</th> 
        <th>Date</th> 
        <th>TreatmentName</th> 
        <th>Patient Name</th> 
        <th>Time Slot</th> 
        <th>Email</th> 
        <th>Mobile</th>
      </tr>
    </thead> 
    <tbody>
        {
            data.map((s,index) =>
        
      <tr class="hover border-2">
        <th>{index+1}</th> 
        <td>{s.date}</td> 
        <td>{s.treatmentName}</td> 
        <td>{s.patientName}</td> 
        <td>{s.slot}</td> 
        <td>{s.patientEmail}</td> 
        <td>{s.mobile}</td>
      </tr>
            )}
      
    </tbody> 
    
  </table>
</div>
        </div>
    );
};

export default AppointmentList;