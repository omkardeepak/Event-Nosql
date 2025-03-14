"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen w-full flex">
      {/* Left Half - Text Section */}
      <div className="w-1/2 flex flex-col items-start justify-center pl-20 bg-pink-100 p-10">
        <h1 className=" bg-gradient-to-r from-blue-500 text-5xl to-pink-500 bg-clip-text text-transparent bg-clip-next font-extrabold pt-20">Welcome to Eventify..</h1>
        <div className="flex flex-col font-extrabold font-serif text-8xl z-20 h-full ">
          
      <span className="bg-gradient-to-r from-blue-500 text-5xl to-pink-500 bg-clip-text text-transparent bg-clip-next  pt-32">

                <span>Join & </span> <br></br>
                <span >Explore</span> <br></br>
                <span> Events </span>
              <span>today  !!  </span>
                </span>
            </div>
      </div>
      
      {/* Right Half - Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-pink-100">
        <div className="p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
              {isLogin ? "Login" : "Sign Up"}
            </span>
          </h2>
          
          <form className="mt-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="user Name"
                className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "New user?" : "Already have an account?"} {" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-500 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
