import React, { useState } from 'react'
import {assets} from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);


  const handleNavigation = (e) => {
    navigate(e.currentTarget.dataset.path);
  }

  const handleLogout = () => {
    setToken(false);
  }

  return (
    <div className='flex items-center justify-between py-4 mb-5 border-b border-b-gray-500'>
      <img data-path="/" onClick={handleNavigation} className='w-44 cursor-pointer' src={assets.logo} alt="logo" />
      <ul className='hidden md:flex items-start gap-5 font-mediun'>
        <NavLink className="no-underline active>hr:block" to="/">
          <li className="py-1 list-none">HOME</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden'/>
        </NavLink>
        <NavLink className="no-underline" to="/doctor">
          <li className="py-1 list-none">ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden'/>
        </NavLink>
        <NavLink className="no-underline" to="/about">
          <li className="py-1 list-none">ABOUT</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden'/>
        </NavLink>
        <NavLink className="no-underline" to="/contact">
          <li className="py-1 list-none">CONTACT</li>
          <hr className='border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center'>
        {
          token 
          ? 
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="prorfile picture" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown-icon" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p data-path="/myProfile" onClick={handleNavigation} className='hover:text-black cursor-pointer'>My Profile</p>
                <p data-path="/myAppointment" onClick={handleNavigation} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div> 
          :
          <button data-path="/login" onClick={handleNavigation} className='hidden md:block text-white bg-primary px-8 py-3 rounded-full font-light'>Create Account</button>
        }
      </div>
    </div>
  )
}

export default Navbar

