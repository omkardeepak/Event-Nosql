"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const DiscoverPage = () => {
  const router = useRouter(); // Initialize useRouter

  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/discoveruser?username=${username}`);
        const data = await response.json();
        console.log(data); // Check the structure of the received data
        if (data && data.length > 0) { // Check if data is not empty
          setEvents(data); // Directly set data (no need for data.events)
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    if (username) {
      fetchEvents();
    }
  }, [username]);

  const feedback =()=>{
    router.push(`/userfeedback?username=${encodeURIComponent(username)}`);
  }
  const Home =()=>{
    router.push(`/userhome?username=${encodeURIComponent(username)}`);
  }
  const Discover =()=>{
    router.push(`/discoveruser?username=${encodeURIComponent(username)}`);
  }

  return (
    <div className='bg-neutral-900 h-screen w-full'>
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
        <span className="text-sm">9:39 PM GMT+5:30</span>
        <button className="text-white">Create Event</button>
        
       
        <div className="w-8 h-8 bg-green-300 rounded-full"></div> {/* Profile Icon */}
      </div>
    </nav>
        
      <div className='bg-neutral-900 rounded-lg shadow-lg min-h-screen w-full'>
        <div className='text-right mb-10'>
         
        </div>
        <div className='flex flex-col items-center'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-2'
          />
          <h2 className='text-2xl font-bold text-gray-100 hover:text-blue-600 cursor-pointer transition-colors'>
            {username}
          </h2>
          <h3 className="text-gray-100 text-3xl left-16 absolute top-52 mt-12">Registered Events:</h3>

          {/* Display the event data */}
          <div className='mt-16 w-1/2 px-4'>
            {events && events.length > 0 ? ( // Add a check for events
              <ul className='space-y-4'>
                {events.map((event, index) => (
                  <li key={index} className='bg-darkblue pl-7 text-white p-4 rounded-lg shadow'>
                    <h1 className='text-4xl'> {event.event_name}</h1>
                    <p className='text-lg'>{(() => {
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long', // This adds the full day name
        month: 'long',
        day: 'numeric'
      });
      return formattedDate;
    })()}</p>
                    <p><strong></strong>                  {event.time.slice(0, 5)}
                    </p>
                    <p><strong></strong> {event.loc}</p>

                    <p className='flex flex-row w-full'><strong></strong> {event.des}
                    </p>
                    {/* <p className=''><strong></strong> {event.des}</p> */}

                  </li>
                  
                ))}
              </ul>
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
