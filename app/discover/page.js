"use client"
import React from 'react';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
 // Assuming you have a Navbar component

 const DiscoverPage = () => {
   const [events, setEvents] = useState([]); // Initialize events as an empty array
 const searchParams = useSearchParams();
       const username = searchParams.get('username'); 
    
   useEffect(() => {
     async function fetchEvents() {
       try {
         const response = await fetch('/api/discover?username=exampleUser');
         const data = await response.json();
         if (data && data.events) {
           setEvents(data.events); // Ensure events are set
         }
       } catch (error) {
         console.error('Error fetching events:', error);
       }
     }
 
     fetchEvents();
   }, []);
 
  return (
    <div className='bg-white h-screen w-full'>
      <Navbar />

      <div className='bg-white rounded-lg shadow-lg h-full w-full'>
        <div className='text-right'>
          <button
            className='text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded'
            onClick={() => {}}
          >
            ×
          </button>
        </div>
        <div className='flex flex-col items-center'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-4'
          />
          <h2 className='text-2xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors'>
            {username}
          </h2>

          {/* Display the event data */}
          <div className='mt-6 w-full px-4'>
          {events && events.length > 0 ? ( // Add a check for events
        <ul className='space-y-4'>
          {events.map((event, index) => (
            <li key={index} className='bg-gray-100 p-4 rounded-lg shadow'>
              {event.event}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p> // Fallback for no events
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;