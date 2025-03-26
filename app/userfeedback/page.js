"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';

const DiscoverPage = () => {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [eventName, setEventName] = useState('');
  const [hostName, setHostName] = useState('');
  const [feedbackBody, setFeedbackBody] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const handleProfile = () => {
    Router.push(`/discoveruser?username=${encodeURIComponent(username)}`);
  };

  const handleFeedback = () => {
    Router.push(`/feedback?username=${encodeURIComponent(username)}`);
  };

  const handleSubmit = async () => {

    if (!eventName || !hostName || !feedbackBody || !rating) {

      alert("Please fill out all fields and provide a rating.");
      return;
    }

    const feedbackData = {
      username:username,
      eventName:eventName,
      hostName:hostName,
      feedback: feedbackBody,
      rating: rating
    };
    try {
      const response = await fetch('/api/userfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Feedback submitted successfully!');
        // You can clear the form after successful submission
        setEventName('');
        setHostName('');
        setFeedbackBody('');
        setRating(0);
      } else {
        console.error('Error submitting feedback:', data);
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  return (
    <div className='bg-neutral-900 h-screen w-full'>
      <header className="flex justify-between text-white bg-lightblue items-center p-7 border-b h-20 border-gray-700">
        <nav className="flex space-x-4">
          <a href="#" className="text-sm font-medium hover:underline">Events</a>
          <button onClick={handleFeedback} className="text-sm font-medium hover:underline">Feedback</button>
          <button onClick={handleProfile} className="text-sm font-medium hover:underline">Discover</button>
        </nav>
        <a href="/"><button className="text-sm font-medium">Log out</button></a>
      </header>
      <div className='bg-neutral-900 rounded-lg shadow-lg h-full w-full'>
        <div className='flex flex-col items-center'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-2'
          />
          <h2 className='text-2xl font-bold text-gray-100 hover:text-blue-600 cursor-pointer transition-colors'>
            {username}
          </h2>
          <br></br><br></br>

          <div className="w-1/3 bg-white rounded-xl shadow-md overflow-hidden h-[450px] p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Event Feedback</h2>

            <div className="mb-4">
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                id="eventName"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the event name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="hostName" className="block text-sm font-medium text-gray-700">Host Name</label>
              <input
                type="text"
                id="hostName"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter the host name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="feedbackBody" className="block text-sm font-medium text-gray-700">Feedback</label>
              <textarea
                id="feedbackBody"
                rows="4"
                value={feedbackBody}
                onChange={(e) => setFeedbackBody(e.target.value)}
                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Share your feedback"
              ></textarea>
            </div>

            <div className='flex flex-row'>
              <div className="flex space-x-1">
                {[...Array(5)].map((star, index) => {
                  const starValue = index + 1;

                  return (
                    <svg
                      key={index}
                      className={`w-7 h-7 cursor-pointer ${ (hover || rating) >= starValue ? 'text-yellow-500' : 'text-gray-300' }`}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(starValue)}
                      fill="currentColor"
                      viewBox="0 0 26 26"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.905c.967 0 1.371 1.24.588 1.81l-3.97 2.884a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.97-2.884a1 1 0 00-1.175 0l-3.97 2.884c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L.486 10.101c-.783-.57-.379-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.674z"></path>
                    </svg>
                  );
                })}
              </div>
              <div className="flex justify-center ml-32">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
