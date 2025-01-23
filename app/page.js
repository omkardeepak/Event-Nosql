import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
  <div className="flex w-full h-full">
    {/* Left Section */}
    <div className="flex-[1]  bg-red-600 text-white p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-2xl pb-16 font-bold text-center">Host an event</h1>
      
      {/* Image inserted here */}
      <img src="/host1.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto" />
      
      <button className="bg-red-100 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-100">
        Sign up as host
      </button>
      
      <p className="text-sm text-center pt-10 flex flex-col">
        Already have an account?{" "}
        <a href="#" className="underline">
          Login here
        </a>
      </p>
    </div>

      

        {/* Right Section */}
        <div className="flex-[1]  bg-red-300 text-white p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-2xl pb-16 font-bold text-center">Join an event</h1>
      
      {/* Image inserted here */}
      <img src="/user.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto" />
      
      <button className="bg-red-100 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-100">
        Sign up as user
      </button>
      
      <p className="text-sm text-center pt-10 flex flex-col">
        Already have an account?{" "}
        <a href="#" className="underline">
          Login here
        </a>
      </p>
    </div>
      </div>
    </div>
  );
};

export default Home;