'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          const [emailError, setEmailError] = useState('');
          const [passwordError, setPasswordError] = useState('');


          const handleNameChange = (e) => {
            setUsername(e.target.value);
          };
        
          const handleEmailChange = (e) => {
            setEmail(e.target.value);
            const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/;
            if (!emailRegex.test(e.target.value)) {
              setEmailError('Please enter a valid email.');
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
    
        const response = await fetch('/api/hostauth', {  // Make sure your API path is correct (/api/)
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password,isLogin }), // Send form data as JSON
        });
    
        const data = await response.json();
    
        // Set response message based on the API response
        console.log(data.message || 'Query was successful!');
    
        // Optionally, navigate to another page after successful registration
        if (response.ok) {
          alert(data.message)
          const name=data.hostname
          router.push(`/hosthome?hostname=${encodeURIComponent(name)}`); // Redirect to home page or any other success page
        } else {
          alert('Registration failed: ' + data.message);
        }
      };

  return (
    <div className="h-screen w-full flex">
      {/* Left Half - Text Section */}
      <div className="w-1/2 flex flex-col items-start justify-center pl-20 bg-blue-100 p-10">
        <h1 className="bg-gradient-to-r  from-blue-500 text-5xl to-pink-500 bg-clip-text text-transparent font-extrabold pt-20">
          Welcome to Eventify..
        </h1>
        <div className="flex flex-col font-extrabold font-serif text-8xl z-20 h-full">
          <span className="bg-gradient-to-r from-blue-500 text-5xl to-pink-500 bg-clip-text text-transparent pt-32">
            <span>Host & </span> <br />
            <span>Manage</span> <br />
            <span>Your Events</span>
            <span> Today!!</span>
          </span>
        </div>
      </div>
      
      {/* Right Half - Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-blue-100">
        <div className="p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
              {isLogin ? "Host Login" : "Sign Up"}
            </span>
          </h2>
          
          <form className="mt-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
              value={username}
                onChange={handleNameChange}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 text-neutral-950 focus:ring-indigo-500"
              />
            )}
            <input
            value={email}
            onChange={handleEmailChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2  border rounded-lg mb-3 focus:ring-2 text-neutral-950 focus:ring-indigo-500"/>
            
    {emailError && <p className="text-red-500 text-sm  w-96">{emailError}</p>}

            <input
            value={password}
            onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 text-neutral-950 focus:ring-indigo-500"/>

              {passwordError && <p className="text-red-500 text-sm relative">{passwordError}</p>}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          
          <p className="mt-4 text-center text-gray-600">
            {isLogin ? "New host?" : "Already have an account?"} {" "}
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
