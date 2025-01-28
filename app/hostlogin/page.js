'use client';
import { useState } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize useRouter
  

  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    // Handle form submit
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const response = await fetch('/api/hostlogin', {  // Make sure your API path is correct (/api/)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send form data as JSON
      });
  
      const data = await response.json();
  
      // Set response message based on the API response
      console.log(data.message || 'Query was successful!');
  
      // Optionally, navigate to another page after successful registration
      if (response.ok) {
        alert(" Successfully Logged In!")
        router.push('/'); // Redirect to home page or any other success page
      } else {
        alert('Incorrect email id or password' );
      }
    };
  
  return (
    <div className="bg-neutral-900 flex justify-center items-center h-screen w-full">
        <div className="h-full w-full z-0 absolute object-contain overflow-hidden">
                    <Image src="/abs.jpg" width={1700} height={1200} />
        </div>
  <div className="w-5/6  shadow-2xl h-1/2 flex items-center justify-center flex-row  z-20 ">
<div className=" bg-black bg-opacity-5  border-2 w-2/3 h-full left-0 rounded-l-md pl-20 pt-16">
<div className="flex flex-col font-extrabold font-serif text-6xl z-20 h-full ">
                <span>Login to</span><span>bring</span><span>your </span><span>events to  life!</span>
            </div>
</div>

<div className="  w-1/3 h-full right-0 flex justify-center ">
<div className="flex flex-col space-y-2 w-full justify-center items-center h-full bg-black bg-opacity-5  border-2 rounded-r-xl shadow-2xl z-20 pb-7 ">
<form onSubmit={handleSubmit}>

<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
            <div className="space-y-4  ">
            
          <div className=" space-x-2 mb-2 text-white flex flex-row items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>
          <input placeholder="email-id" className="rounded-md p-2 border-2 text-black border-neutral-400" onChange={handleEmailChange}></input>
          </div>
          
          <div className="space-x-2 text-white flex flex-row items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
          <input placeholder="password" className="rounded-md p-2 text-black border-neutral-400 border-2" onChange={handlePasswordChange}></input>
          </div>
          <div className="flex justify-center pt-5">
          <button className="bg-green-600  h-10 w-36  hover:scale-105 rounded-md hover:bg-green-500 border-2 ">Login</button>
          </div>
          </div>
          </form>

          </div>
</div>
  </div>
    </div>
  );
};

export default Login;