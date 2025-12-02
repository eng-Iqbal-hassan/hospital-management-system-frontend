import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Doctor from './pages/Doctor';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointments";
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      
      <Routes>
        <Route path= "/" element={<Home />}></Route>
        <Route path= "/doctor" element={<Doctor />}></Route>
        <Route path= "/doctor/:speciallity" element={<Doctor />}></Route>
        <Route path= "/contact" element={<Contact />}></Route>
        <Route path= "/about" element={<About />}></Route>
        <Route path= "/login" element={<Login />}></Route>
        <Route path= "/myProfile" element={<MyProfile />}></Route>
        <Route path= "/myAppointment" element={<MyAppointment />}></Route>
        <Route path= "/appointment/:doc_id" element={<Appointment />}></Route>
      </Routes>
    </div>
  )
}

export default App
