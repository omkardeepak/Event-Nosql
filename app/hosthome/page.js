'use client';
import { useState,useCallback,useRef,useEffect } from "react";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import confetti from 'canvas-confetti';


export default function Home() {
  const confettiRef = useRef(null);

    const [currentTime, setCurrentTime] = useState('');
  
    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setCurrentTime(`${timeString} `);
      };
  
      updateTime();
      const interval = setInterval(updateTime, 1000);
  
      return () => clearInterval(interval);
    }, []);
  // Load Google Maps script
  

  const router = useRouter(); // Step 2: Initialize the router


  
      const [name, setName] = useState('');
      const [date, setDate] = useState('');
      const [time, setTime] = useState('');
      const [loc, setLoc] = useState('');
      const [desc, setDesc] = useState('');
      const [selectedImage, setSelectedImage] = useState(null);


      const searchParams = useSearchParams();
      const hostname = searchParams.get('hostname'); 
   
      
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
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      // You can preview the image here if needed
    }
  };

  // Trigger file input when div is clicked
  const handleDivClick = () => {
    document.getElementById('imageUpload').click();
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("date", date);
  formData.append("time", time);
  formData.append("loc", loc);
  formData.append("desc", desc);
  formData.append("hostname", hostname);
  
  if (selectedImage) {
    formData.append("image", selectedImage); // Append image file
  }

  const response = await fetch("/api/eventregister", {
    method: "POST",
    body: formData, // Send FormData instead of JSON
  });

  const data = await response.json();

  if (response.ok) {
    alert("Registered Successfully!");
    router.push(`/hosthome?hostname=${encodeURIComponent(hostname)}`);
  } else {
    alert("Registration failed: " + data.message);
  }
};

  const feedback =()=>{
    router.push(`/hostfeedback?hostname=${encodeURIComponent(hostname)}`);
  }
  const Home =()=>{
    router.push(`/hosthome?hostname=${encodeURIComponent(hostname)}`);
  }
  const Discover =()=>{
    router.push(`/discoverhost?hostname=${encodeURIComponent(hostname)}`);
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger the confetti when the div is visible
          confetti({
            particleCount: 350,
            spread: 350,
            origin: { y: 0.4 },
            colors: ['#08467f', '#FF0303'], // Customize confetti colors
          });
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the div is visible
      }
    );

    if (confettiRef.current) {
      observer.observe(confettiRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (confettiRef.current) {
        observer.unobserve(confettiRef.current);
      }
    };
  }, []);
  
  
  return (
    //bg-[url('/bg.jpg')]
    <div className="bg-gradient-to-br from-gray-100 to-pink-100" >
       <nav className="bg-gray-800 text-gray-300 px-6 py-2 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <span className="text-gray-200 text-lg">✦</span> {/* Star Icon */}
        <div className="flex items-center gap-4">
        <button onClick={Home}>Home</button>
        <button onClick={feedback}>Feedback</button>
        <button onClick={Discover}>Discover</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-sm">{currentTime}</span>
        <button className="text-white">Create Event</button>
        
       
        <div className="w-8 h-8 bg-green-300 rounded-full"></div> {/* Profile Icon */}
      </div>
    </nav>
      
      {/* <Navbar/> */}
      {/* <div className="h-44  text-darkblue w-full flex ml-20 items-center text-4xl font-mono">
      </div> */}


    <div className='flex flex-col items-center justify-center h-screen  ' >
    <div className="z-40 absolute justify-center w-full h-72 items-center">
  <h1 className='text-4xl text-justify  font-bold text-gray-800 top-10 z-40 justify-center flex'>Kickstart your event journey—Create and manage your event effortlessly!</h1>
  <div className="w-full ml-[670px] mt-[100px]">
          <a href="#create" className='px-6 py-3 bg-indigo-600 text-white text-lg w-full rounded-xl hover:bg-indigo-500'>
            + Create Event
          </a>
          </div>
          </div>

      <div className=''>
        <div className='text-center '>
        
          
          <div className="w-screen h-screen">
          <video
    src="/host.mp4"
    autoPlay
    loop
    muted
    className="h-full w-full object-cover object-top z-0 "
  ></video>
 
  </div>
 
        </div>
      </div>
    </div>


      
    
     <div className="relative min-h-screen bg-[#d2d2d2]  flex justify-center items-center  z-0  " id="create" ref={confettiRef}>
        <div>
          
        </div>
        <div className='mb-64 mr-96 -ml-56 mt-56 absolute z-0 rounded-2xl border-2 '>
            <div
        className="w-64 h-64 border-2 border-dashed border-green-500 rounded-md text-green-600 flex justify-center items-center cursor-pointer"
        onClick={handleDivClick}
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="object-cover w-full h-full"
          />
        ) : (
          <p>Click to upload an image</p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      {/* Upload button */}

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
              className="w-full px-3 py-2 border rounded-lg shadow-sm border-hidden bg-inherit placeholder-darkblue text-5xl font-serif focus:outline-none text-black " onChange={handleNameChange}
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
              className=" font-mono font-Lexend px-3 py-2 rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit  text-darkblue border-2 backdrop-blur-0 w-1/2 " onChange={handleDateChange} min={new Date().toISOString().split("T")[0]}
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
              className="font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit text-darkblue border-2 backdrop-blur-0 w-1/2 " onChange={handleTimeChange}
            />
          </div>
           {/* location */}
           <div className="mb-4  bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl flex">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="text"
              placeholder="Add location"
              className="font-mono px-3 py-2  text-black rounded-2xl  focus:outline-none border-hidden bg-inherit  placeholder-darkblue border-2 backdrop-blur-0 w-full h-16" onChange={handleLocationChange}
            />
          </div>

          {/* Description */}
          <div className="mb-4 flex bg-white-light  text-black border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className=" block  text-slate-50 font-medium mb-2 ">
              
            </label>
            <input
              type="text"
              placeholder="Description"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full h-16" onChange={handleDescriptionChange}
            />
          </div>

          {/* Price */}
          {/* <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="number"
              placeholder="Price"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full"
            />
          </div> */}

          {/* Capacity */}
          {/* <div className="mb-4 flex bg-white-light  border-[rgb(255,255,255,0.2)] rounded-2xl">
            <label className="block  text-slate-50 font-medium mb-2">
              
            </label>
            <input
              type="number"
              placeholder="Capacity"
              className=" font-mono px-3 py-2  rounded-2xl shadow-sm focus:outline-none border-hidden bg-inherit placeholder-darkblue border-2 backdrop-blur-0 w-full"
            />
          </div> */}
          <button
        
        className="px-4 py-2 bg-lightblue text-darkblue font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full" type="submit"
      >
        CREATE EVENT
      </button>
        </form>
      </div>
    </div>
    </div>
  );
}
