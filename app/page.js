import React from "react";

const Home = () => {
  return (
    <div className="bg-[#f4e9bc] flex justify-center items-center h-screen w-full">
  <div className="flex h-full w-full">
    {/* Left Section */}
    <div className="flex-[1] bg-[#f4e9bc] text-[#5fa09f] p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-5xl font-extrabold font-serif text-[#5fa09f] pb-16  text-center">Host an event</h1>
      
      {/* Image inserted here */}
      <img src="/host1.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto animate-scaleUp" />
      <a href="/hostsignup">
      <button className="bg-[#60a09f] text-[#ffffff] font-serif font-semibold px-6 py-4 rounded shadow hover:bg-transparent" >
        Sign up as host
      </button>
      </a>
      
      <p className="text-sm text-[#045453] font-serif text-center pt-10 flex flex-col">
        Already have an account?{" "}
        <a href="/hostlogin" className="underline">
          Login here
        </a>
      </p>
    </div>

      

        {/* Right Section */}
        <div className="flex-[1]  bg-[#045453] text-black p-10 flex flex-col justify-center items-center space-y-6"> {/* Reduced space between elements */}
      <h1 className="text-5xl text-[#f4e9bc] font-serif pb-16 font-extrabold text-center">Join an event</h1>
      
      {/* Image inserted here */}
      <img src="/user.png" alt="Event Hosting" className="w-98 h-48 object-contain mx-auto animate-scaleUp" />
      <a href="/usersignup">
      <button className="bg-[#f4e9bc] font-serif text-black font-semibold px-6 py-4 rounded shadow hover:bg-[white]">
        Sign up as user
      </button>
      </a>
      
      <p className="text-sm text-[#f4e9bc] font-serif text-center pt-10 flex flex-col">
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