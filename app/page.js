import React from "react";

const Home = () => {
  return (
    <div className="bg-[#ecff20] flex justify-center items-center h-screen w-full">
  <div className="flex w-11/12 h-5/6">
    {/* Left Section */}
    <div className="rounded-3xl border-8 border-black flex-[1] mr-16 bg-[#49ff5e] text-white p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-5xl font-extrabold text-[#ff2f2f] pb-16  text-center">Host an event</h1>
      
      {/* Image inserted here */}
      <img src="/host1.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto animate-scaleUp" />
      <a href="/hostsignup">
      <button className="bg-[#064a31] text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-100">
        Sign up as host
      </button>
      </a>
      
      <p className="text-sm text-black text-center pt-10 flex flex-col">
        Already have an account?{" "}
        <a href="/hostlogin" className="underline">
          Login here
        </a>
      </p>
    </div>

      

        {/* Right Section */}
        <div className="rounded-3xl border-8 border-black flex-[1]  bg-[#4f98ff] text-black p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-5xl pb-16 font-bold text-center">Join an event</h1>
      
      {/* Image inserted here */}
      <img src="/user.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto animate-scaleUp" />
      <a href="/usersignup">
      <button className="bg-red-100 text-black font-semibold px-6 py-4 rounded shadow hover:bg-gray-100">
        Sign up as user
      </button>
      </a>
      
      <p className="text-sm text-center pt-10 flex flex-col">
        Already have an account?{" "}
        <a href="/userlogin" className="underline">
          Login here
        </a>
      </p>
    </div>
      </div>
    </div>
  );
};

export default Home;