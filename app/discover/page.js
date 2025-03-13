"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useSearchParams } from 'next/navigation';

const DiscoverPage = () => {
  const [events, setEvents] = useState([]); // Initialize events as an empty array
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/discover?username=${username}`);
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

  return (
    <div className='bg-cream h-screen w-full'>
      <Navbar />

      <div className='bg-cream rounded-lg shadow-lg h-full w-full'>
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
          <h3 className="text-black text-3xl left-5 absolute top-52">Registered Events:</h3>

          {/* Display the event data */}
          <div className='mt-6 w-full px-4'>
            {events && events.length > 0 ? ( // Add a check for events
              <ul className='space-y-4'>
                {events.map((event, index) => (
                  <li key={index} className='bg-darkblue text-white p-4 rounded-lg shadow'>
                    <p><strong>Event:</strong> {event.event_name}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.loc}</p>
                    <p><strong>Description:</strong> {event.des}</p>
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
