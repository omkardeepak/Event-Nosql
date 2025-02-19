'use client';
import { useState } from "react";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Navbar from "../components/navbar";

export default function Home() {
      const [name, setName] = useState('');
      const [date, setDate] = useState('');
      const [time, setTime] = useState('');
      const [loc, setLoc] = useState('');
      const [desc, setDesc] = useState('');

      const searchParams = useSearchParams();
      const username = searchParams.get('username'); 
   
      
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLoc(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDesc(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/eventregister', {  // Make sure your API path is correct (/api/)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,date,time,loc,desc }), // Send form data as JSON
    });

    const data = await response.json();

    // Set response message based on the API response
    console.log(data.message || 'Query was successful!');

    // Optionally, navigate to another page after successful registration
    if (response.ok) {
      alert("Registered Successfully !")
      router.push('/'); // Redirect to home page or any other success page
    } else {
      alert('Registration failed: ' + data.message);
    }
  };
  
  
  return (
    //bg-[url('/bg.jpg')]
    <div>
      <Navbar/>
      <div className="h-44 bg-cream text-darkblue w-full flex justify-center items-center text-7xl font-mono">
      <h1>Welcome, {username}!</h1>      
      </div>
    
    <div className="relative min-h-screen bg-cream flex justify-center items-center  z-0  " >
        <div>
          
        </div>
        <div className='mb-64 mr-96 -ml-56 mt-56 absolute z-0 rounded-2xl border-2 '>
            <img src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/gallery-images/te/d1ed5a5c-27b8-4595-8d38-29f48f304991" width={330} height={330} className=' rounded-2xl '></img>
        </div>
      <div className="max-w-md w-full  p-6 rounded-lg  relative z-10 ml-48  mt- border-none ">
        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4 z-0">
            <label className="block text-darkblue font-medium mb-2">
              {/* Event Name */}
            </label>
            <input
              type="text"
              placeholder="Event name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-hidden bg-inherit placeholder-darkblue text-5xl font-serif focus:outline-none " onChange={handleNameChange}
            />
          </div>

          {/* Event Date */}
          <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className="font-mono block   text-darkblue font-medium  w-1/2 mt-2 p-2 mb-2 ">
              Start date
            </label>
            
            <input
              type="date"
              
              placeholder="Starting date"
              className=" font-mono font-Lexend px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit  text-darkblue border-2 backdrop-blur-0 w-1/2 " onChange={handleDateChange}
            />
          </div>

          {/* Start Time */}
          <div className="mb-4  bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl flex">
            <label className="font-mono block  text-darkblue font-medium w-1/2 mt-2 p-2 mb-2">
              Start Time
            </label>
            <input
              type="time"
              placeholder="Start time"
              className="font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit text-darkblue border-2 backdrop-blur-0 w-1/2" onChange={handleTimeChange}
            />
          </div>
           {/* location */}
           <div className="mb-4  bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl flex">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="text"
              placeholder="Add location"
              className="font-mono px-3 py-2  rounded-2xl  focus:outline-none border-hidden bg-inherit  placeholder-darkblue border-2 backdrop-blur-0 w-full h-16" onChange={handleLocationChange}
            />
          </div>

          {/* Description */}
          <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className=" block  text-slate-50 font-medium mb-2 ">
              
            </label>
            <input
              type="text"
              placeholder="Description"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full h-16" onChange={handleDescriptionChange}
            />
          </div>

          {/* Price */}
          <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="number"
              placeholder="Price"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full"
            />
          </div>

          {/* Capacity */}
          <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="number"
              placeholder="Capacity"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full"
            />
          </div>
          <button
        
        className="px-4 py-2 bg-lightblue text-cream font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full" type="submit"
      >
        CREATE EVENT
      </button>
        </form>
      </div>
    </div>
    </div>
  );
}
