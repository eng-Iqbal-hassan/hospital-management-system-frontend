import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([]);""
  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const navigate = useNavigate();
   
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];

  }
  

  const getUserAppointments = async () => {
    try {
      
      const {data} = await axios.get(backendUrl + "/api/user/appointments", {headers: {token}})

      if(data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      // console.log(appointmentId)
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", {appointmentId}, {headers: {token}})

      console.log("data is", data);

      if(data.success) {
        toast.success(data.message)
        getUserAppointments();
        getDoctorsData();
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        // Here from console we have get the razorpay properties when the payment is successfully done which are razorpay order id, razorpay payment id and razorpay signature. By using these properties we can verify the payment in the backend, and after verifying the payment we can mark the payment status to true for it.

        // We are going to make the API call for payment verification
        try {
          const {data} = await axios.post(backendUrl + "/api/user/verify-razorpay", response, {headers: {token}});
          if(data.success) {
            getUserAppointments();
            navigate("/myAppointment")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }

      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open(); // From here razorpay will open as pop-up.

  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl+"/api/user/payment-razorpay",{appointmentId}, {headers:{token}});
      if(data.success) {
        // console.log(data);
        initPay(data.order);
      }
      // After that we will do razor pay integration on frontend 
      // For it we will search for razorpay web integration and select the option integration step
      // We have copied the script and paste in html file (Todo);
      // After that we have initiallized the initPay function and then 

    } catch (error) {

    }
  }

  useEffect(()=>{
    if(token) {
      getUserAppointments();
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      {/* Here we have to fill the appointment data but for now we do not have this data and when we develop its backend then we will get this data and we will use over there for now we will go with the doctors data */}
      <div>
        {appointments.slice(0,2).map((item,index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt="image" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-500'>Paid</button>}
              {!item.cancelled && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment is cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments

