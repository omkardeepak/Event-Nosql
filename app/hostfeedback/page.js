"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

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
  
  const [feedbacks, setFeedbacks] = useState([]); // Renamed to feedbacks for clarity
  const searchParams = useSearchParams();
  const hostname = searchParams.get('hostname'); // Use the correct query parameter

  useEffect(() => {
    async function fetchFeedbacks() {
      try {
        const response = await fetch(`/api/hostfeedback?hostname=${hostname}`, {
          method: 'GET', // Ensure the method is explicitly set to GET
        });
        const data = await response.json();
        console.log(data); // Check the structure of the received data
        if (data && data.length > 0) { 
          setFeedbacks(data); 
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    }

    if (hostname) {
      fetchFeedbacks();
    }
  }, [hostname]);
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
    <div className='bg-gray-200 h-screen w-full'>
<nav className="bg-gray-800 text-gray-300 px-6 py-2 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <span className="text-gray-200 text-lg">✦</span> {/* Star Icon */}
        <div className="flex items-center gap-4">
          <button onClick={Home}>Home</button>
          <button >Feedback</button>
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
      <div className='bg-gray-200 rounded-lg shadow-lg h-full w-full'>
      <h3 className="text-gray-800 text-3xl font-semibold left-16 ml-32 mt-32">Feedbacks:</h3>

        
          {/* <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-2'
          />
          <h2 className='text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors'>
            {hostname}
          </h2> */}

          {/* Display the feedback data */}
          <div className='mt-16 w-1/2 px-4 flex'>
            {feedbacks && feedbacks.length > 0 ? (
              <ul className='space-y-0 flex flex-row'>
                {feedbacks.map((feedback, index) => (
                  <li key={index} className="bg-gray-200 border-2 border-gray-600 rounded-xl shadow-lg p-6 h-72 w-5/6 mx-5">
                  <div className="flex items-center space-x-4 mb-4">
                    {/* User avatar */}
                    <img
                      src={feedback.userAvatar || 'https://static.vecteezy.com/system/resources/previews/016/016/742/non_2x/transparent-like-feedback-icon-free-png.png'} // Use a placeholder if no avatar is available
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      {/* Username */}
                      <p className="text-lg text-gray-600">Submitted by:<span className='font-semibold ml-2'>{feedback.username}</span> </p>
                      {/* Host and date */}
                      <p className="text-xs text-gray-500"></p>
                    </div>
                  </div>
                
                  {/* Event Name */}
                  <h1 className="text-xl font-semibold text-gray-900 mb-2">{feedback.eventName}</h1>
                
                  {/* Feedback text */}
                  <p className="text-sm text-gray-700 h-28 mb-4">{feedback.feedback}</p>
                
                  {/* Star Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`w-5 h-5  ${starIndex < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.97 0 1.371 1.24.588 1.81l-3.98 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.98-2.89a1 1 0 00-1.175 0l-3.98 2.89c-.784.57-1.838-.197-1.54-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.05 9.1c-.783-.57-.382-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z" />
                      </svg>
                    ))}
                    <span className="text-gray-800  ml-40 text-lg">✦</span>
                  </div>
                
                  {/* Read more link */}
                </li>
                
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center h-20">
       <p className="text-black">Loading ...</p>
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
            )}
          </div>
        
      </div>
    </div>
  );
};

export default DiscoverPage;
