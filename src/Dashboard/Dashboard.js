import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    Routes,
    Route,
    Link,
    Outlet,
  } from "react-router-dom";
import auth from '../firebase.init';
import useAdmin from '../Hooks/useAdmin';


const Dashboard = () => {
  const [user]=useAuthState(auth)
 const [admin] = useAdmin(user)

    return (
        <div class="drawer  drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content py-4 justify-center">
   {/*  <!-- Page content here --> */}
{/*  <strong className='text-secondary text-center m-4'>My Appointment List:</strong> */}
  <Outlet></Outlet>
 
  
  </div> 
  <div class="drawer-side ">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <ul class="menu p-4 overflow-y-auto w-60 bg-green-300 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><Link to="/Dashboard">MyProfile</Link></li>
      <li><Link to="/Dashboard/AppointmentList">AppointmentList</Link></li>
      <li> <Link to="/Dashboard/AddDoctor">Add Doctor</Link></li>
      
      <li>
       {admin && <>
       <Link to="/Dashboard/Users">Users</Link>
      
       <Link to="/Dashboard/ManageDoctor">ManageDoctor</Link>
       </>}
        </li>
   
    </ul>
  
  </div>
</div>
    );
};

export default Dashboard;