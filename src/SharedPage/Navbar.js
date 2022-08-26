import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from './../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth);
 // console.log(user)
  const logout = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
    navigate('/Home')
  };

    const Menu =[<li ><NavLink  className="rounded-lg" to="/Home"> Home</NavLink></li>,
    <li><NavLink className="rounded-lg" to="/About"> About</NavLink></li>,
    <li><NavLink className="rounded-lg" to="/Appointment"> Appointment</NavLink></li>,
    <li>
      {user && <NavLink className="rounded-lg" to="/Dashboard">Dashboard</NavLink>}
      </li>,
   <li>
    {user ? 
    <>
     <small>{user.displayName}</small>
   <button onClick={logout} className="btn  btn-ghost">SignOut</button> 
   </>
   : <NavLink className="rounded-lg" to="/Login"> Login</NavLink>}
   </li>
  ]
    return (
        <div class="navbar bg-[#fda456]">
  <div class="navbar-start px-5">
    <div class="dropdown">
      <label tabindex="0" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      {Menu}
        {/* <li tabindex="0">
          <a class="justify-between">
            Parent
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </a>
          <ul class="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li> */}
      </ul>
    </div>
    <NavLink to ="/Home" class="btn btn-ghost normal-case text-xl">Doctor-Portal_Recape</NavLink>
  </div>
  <div class="navbar-center hidden lg:flex navbar-end">
    <ul class="menu menu-horizontal p-0 text-white">
      {Menu}
      {/* <li tabindex="0">
        <a>
          Parent
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul class="p-2">
          <li><a>Submenu 1</a></li>
          <li><a>Submenu 2</a></li>
        </ul>
      </li>
      <li><a>Item 3</a></li> */}
    </ul>
  </div>
  <div className='navbar-end'>
  <label for="my-drawer-2"
  tabindex="1" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
  {/* <label  class="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
  </div>
  
</div>
    );
};

export default Navbar;