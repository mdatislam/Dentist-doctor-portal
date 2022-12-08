import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import auth from "../firebase.init";
import Loading from "../SharedPage/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AppointmentList = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  /* const [appointment,setAppointment]=useState([])
    useEffect(()=>{
      fetch(`https://dentist-doctor.up.railway.app/appointmentList?email=${user.email}`,{
        method:"GET",
        headers: {
          'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      })
      .then(res=>{
        if(res.status=== 401 || res.status=== 403){
          signOut(auth)
          localStorage.removeItem('accessToken')
          navigate("/Home")
        }
        return res.json()
      })
      .then(data=> setAppointment(data))
    },[user]) */

  const { data, isLoading } = useQuery(["list", user], () =>
    fetch(
      `https://dentist-doctor.up.railway.app/appointmentList?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/Home");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }
  //console.log(data)
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
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, index) => (
              <tr class="hover border-2">
                <th>{index + 1}</th>
                <td>{s.date}</td>
                <td>{s.treatmentName}</td>
                <td>{s.patientName}</td>
                <td>{s.slot}</td>
                <td>{s.patientEmail}</td>
                <td>{s.mobile}</td>
                <td>
                  {s.price && !s.paid && (
                    <Link to={`/Dashboard/Payment/${s._id}`}>
                      <button className="btn  btn-xs btn-success">
                        To pay
                      </button>
                    </Link>
                  )}
                  {s.price && s.paid && (
                    <>
                      <span className="text-success">Paid</span>
                      <br></br>
                      <span className="text-warning">
                        {" "}
                        Transection id:{s.transactionId}
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
