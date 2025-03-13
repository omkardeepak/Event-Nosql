'use client';

import Image from 'next/image';

export default function EventLanding() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-gray-100 to-pink-100 px-4 py-8">
      {/* Left Content */}
      <div className="text-center m-10 md:text-left max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Delightful events <br />
          <span className="bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            start here.
          </span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Set up an event page, invite friends, and sell tickets. Host a memorable event today.
        </p>
        <button className="mt-6 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 hover:bg-gray-800">
          create your first event
        </button>
        <button className="mt-6 m-4 px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md transition-transform hover:scale-105 hover:bg-gray-800">
          explore event
        </button>
      </div>
      
      {/* Right Content - Image */}
      <div className="relative w-1/2 h-1/2 md:w-1/2 md:h-1/2 mt-10 md:mt-0">
       <video autoPlay muted loop
       src="\land summer.webm"> 
        
       </video>
      </div>
    </div>
  );
}
