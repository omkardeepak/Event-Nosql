'use client';
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Home = () => {
  const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
  
      const router = useRouter(); // Initialize useRouter
    
      const handleNameChange = (e) => {
        setUsername(e.target.value);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
        if (!emailRegex.test(e.target.value)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
  
      if (e.target.value.length < 5) {
        setPasswordError('Password must contain min 5 char');
      } else {
        setPasswordError('');
      }
      };
    
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/hostsignup', {  // Make sure your API path is correct (/api/)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }), // Send form data as JSON
    });

    const data = await response.json();

    // Set response message based on the API response
    console.log(data.message || 'Query was successful!');

    // Optionally, navigate to another page after successful registration
    if (response.ok) {
      alert("Registered Successfully !")
      router.push(`/hosthome?username=${encodeURIComponent(username)}`); // Redirect to home page or any other success page
    } else {
      alert('Registration failed: ' + data.message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen w-full">
      <div className="flex w-full h-full">
        {/* Left Section */}
        <div className="flex-[2] bg-blue-600 text-white p-10 flex flex-col justify-center items-center space-y-60">
          <div className="h-full w-full z-0 absolute object-contain overflow-hidden">
            <Image src="/leme.png" alt="sf" width={1100} height={9000} />
          </div>
          <div className="flex flex-col font-extrabold font-serif text-8xl z-20 h-full pb-44">
            <span>Create your</span><span> account</span><span>and </span><span>get started!</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-[1] bg-blue-100 text-white p-10 flex flex-col justify-center items-center space-y-20">
          <div className="h-full w-1/3 z-0 absolute object-contain overflow-hidden right-0">
            <Image src="/abstract.png" alt="sf" width={500} height={200} className="flex justify-center items-center mt-40" />
          </div>
          
          <div className="flex flex-col space-y-2 w-80 justify-center items-center h-96 bg-white rounded-md shadow-2xl z-20">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-x-2 mb-2 text-black flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                  </svg>
                  <input
                    placeholder="user-name"
                    onChange={handleNameChange}
                    name="user-name"
                    id="username"
                    className="rounded-md p-2 border-2 border-neutral-400"
                    value={username}
                  />
                </div>

                <div className="space-x-2 mb-2 text-black flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>
                  <div>
      <input
        type="email"
        placeholder="email-id"
        className="rounded-md p-2 border-2 border-neutral-400"
        onChange={handleEmailChange}
        value={email}
      />
      {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
    </div>
                </div>

                <div className="space-x-2 text-black flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                  </svg>
                  <div className="mt-1">
        <input
          type="password"
          placeholder="password"
          className="rounded-md p-2 border-2 border-neutral-400"
          onChange={handlePasswordChange}
          value={password}
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>
                </div>

                <div className="flex justify-center pt-5">
                  <div className="flex justify-center border-2 border-neutral-600 bg-neutral-200 h-14 w-40 items-center hover:scale-105">
                    <button
                      className="bg-green-600 h-10 w-36 hover:scale-105 hover:bg-green-500"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
