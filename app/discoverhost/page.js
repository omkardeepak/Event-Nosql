"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useSearchParams,useRouter } from 'next/navigation';

const DiscoverPage = () => {
const router = useRouter(); // Step 2: Initialize the router
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

  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const searchParams = useSearchParams();
  const hostname = searchParams.get('hostname');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/discoverhost?hostname=${hostname}`);
        const data = await response.json();
        console.log(data); // Check the structure of the received data
        if (data && data.length > 0) { // Check if data is not empty
          setEvents(data); // Directly set data (no need for data.events)
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    if (hostname) {
      fetchEvents();
    }
  }, [hostname]);

  const feedback =()=>{
    router.push(`/hostfeedback?hostname=${encodeURIComponent(hostname)}`);
  }
  const Home =()=>{
    router.push(`/hosthome?hostname=${encodeURIComponent(hostname)}`);
  }
  const Discover =()=>{
    router.push(`/discoverhost?hostname=${encodeURIComponent(hostname)}`);
  }
  const Events =()=>{
    router.push(`/hostevents?hostname=${encodeURIComponent(hostname)}`);
  }

  return (
    <div className='bg-neutral-200 h-screen w-full'>
   <nav className="bg-gray-800 text-gray-300 px-6 py-2 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <span className="text-gray-200 text-lg">✦</span> {/* Star Icon */}
        <div className="flex items-center gap-4">
        <button onClick={Home}>Home</button>
        <button onClick={feedback}>Feedback</button>
        <button onClick={Discover}>Discover</button>
        <button onClick={Events}>View events</button>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-sm">{currentTime}</span>
        
       
        <div className="w-8 h-8 bg-green-300 rounded-full"></div> {/* Profile Icon */}
      </div>
    </nav>
      <div className='bg-neutral-200 min-h-screen rounded-lg shadow-lg '>
        <div className='text-right mb-10'>
         
        </div>
        <div className='flex flex-col items-center'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-2'
          />
          <h2 className='text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors'>
            {hostname}
          </h2>
          <h3 className="text-gray-800 text-3xl left-16 absolute top-52 mt-12">Registered Participants:</h3>

          {/* Display the event data */}
          <div className='mt-32 w-1/2 px-4'>
            {events && events.length > 0 ? ( // Add a check for events
              <div className="overflow-x-auto">
              <table className="table-auto w-full text-left bg-neutral-200 text-black">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-2">Participant Name</th>
                    <th className="px-4 py-2">Event</th>
                    <th className="px-4 py-2">Email ID</th>
                    <th className="px-4 py-2">Mobile No</th>
                    <br></br>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="px-4 py-2">{event.name}</td>
                      <td className="px-4 py-2">{event.event_name}</td>
                      <td className="px-4 py-2">{event.email_address}</td>
                      <td className="px-4 py-2">{event.mobile_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            ) : (
              <p className='text-black'>No events found.</p> // Fallback for no events
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
