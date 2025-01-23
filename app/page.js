import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
      <div className="flex w-full h-full">
        {/* Left Section */}
        <div className="flex-[1] bg-blue-600 text-white p-10 flex flex-col justify-center items-center space-y-60">
          <h1 className="text-2xl font-bold text-center">I'm here for hosting event</h1>
          <button className="bg-white text-blue-600 font-semibold px-6 py-4  rounded shadow hover:bg-gray-100 ">
            Sign up as host
          </button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <a href="#" className="underline">
              Login here
            </a>
          </p>
        </div>

      

        {/* Right Section */}
        <div className="flex-[1] bg-blue-400 text-white p-10 flex flex-col justify-center items-center space-y-60 ">
          <h1 className="text-2xl font-bold text-center">I'm here for events</h1>
          <button className="bg-white text-blue-600 font-semibold px-6 py-4 rounded shadow hover:bg-gray-100">
            Sign up as user
          </button>
          <p className="text-sm text-center">
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