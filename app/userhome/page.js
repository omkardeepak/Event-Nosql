"use client"
import { useState, useEffect,useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function EventsPage() {

  const confettiRef = useRef(null);


      const router = useRouter(); // Initialize useRouter

  const [pname, setPname] = useState('');
    const [email, setEmail] = useState('');
    const [mobno, setMobno] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    
    const searchParams = useSearchParams();

    const username = searchParams.get('username'); 

  
const handleProfile =()=>{
  router.push(`/discoveruser?username=${encodeURIComponent(username)}`);
}
const handleFeedback =()=>{
  router.push(`/userfeedback?username=${encodeURIComponent(username)}`);
}

    const handlePnameChange = (e) => {
      setPname(e.target.value);
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
  
    const handleMobnoChange = (e) => {
      setMobno(e.target.value);


    // Regex for exactly 10 digits
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(e.target.value)) {
      setPhoneError('10 digits required');
    } else {
      setPhoneError('');
    }
  };
    
      
    const handleLinkedinChange = (e) => {
      setLinkedin(e.target.value);
    };
  

  const [events, setEvents] = useState([]);


  // Example of fetching events from a database (replace with your fetch logic)
  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('/api/getEvents');
      const data = await response.json();

      if (data.events) {
        setEvents(data.events); // Set events data including image base64
      } else {
        console.error('Error fetching events:', data.error);
      }
    }

    fetchEvents();
  }, []);


  const [expandedEvent, setExpandedEvent] = useState(null);

  const handleViewMore = (event_name) => {
    if (expandedEvent === event_name) {
      // Collapse the card if it's already expanded
      setExpandedEvent(null);
    } else {
      // Expand the selected card
      setExpandedEvent(event_name);
    }
  };


  const handleRegistration = async (e) => {
    e.preventDefault();
    triggerConfetti();
    const formData = new FormData(e.target);

    const event = formData.get('event_name'); // Access hidden input value

    const response = await fetch('/api/userhome', {  // Make sure your API path is correct (/api/)
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pname , email, mobno ,linkedin, event  }), // Send form data as JSON
    });

    const data = await response.json();

    // Set response message based on the API response
    console.log(data.message || 'Query was successful!');

    // Optionally, navigate to another page after successful registration
    if (response.ok) {
      alert("Registered Successfully !")
     // Redirect to home page or any other success page
    } else {
      alert('Registration failed: ' + data.message);
    }
  };
  const [currentTime, setCurrentTime] = useState('');
        
          useEffect(() => {
            const updateTime = () => {
              const now = new Date();
              const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
              setCurrentTime(`${timeString} `);
            };
        
            updateTime();
            const interval = setInterval(updateTime, 1000);
        
            return () => clearInterval(interval);
          }, []);
    

  const feedback =()=>{
    router.push(`/userfeedback?username=${encodeURIComponent(username)}`);
  }
  const Home =()=>{
    router.push(`/userhome?username=${encodeURIComponent(username)}`);
  }
  const Discover =()=>{
    router.push(`/discoveruser?username=${encodeURIComponent(username)}`);
  }
  
  const triggerConfetti = () => {
    
      confetti({
        particleCount: 350,
        spread: 350,
        origin: { y: 0.4 },
        colors: ["#08467f", "#FF0303"],
      });
    
  };

    return (
      <div className="min-h-screen bg-neutral-900 text-darkblue">
        
        <nav className="bg-gray-800 text-gray-300 px-6 py-2 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <span className="text-gray-200 text-lg">✦</span> {/* Star Icon */}
        <div className="flex items-center gap-4">
        <button onClick={Home}>Home</button>
        <button onClick={feedback}>Feedback</button>
        <button onClick={Discover}>Discover</button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-sm">{currentTime}</span>
        
       
        <div className="w-8 h-8 bg-green-300 rounded-full"></div> {/* Profile Icon */}
      </div>
    </nav>
        
        <main className="">
  
        <div className="relative h-[600px] w-full overflow-hidden">
  {/* Background Video */}
  <video
    src="/userhomevid.mp4"
    autoPlay
    loop
    muted
    className="h-full w-full object-cover object-top"
  ></video>

  {/* Gradient Blur Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r  text-white justify-center items-center flex  text-8xl flex-col font-bold ">EXPLORE EVENTS<span className='mt-20 text-4xl font-semibold'>Discover Upcoming Events and Join the Excitement!







</span><div className='absolute bottom-7'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
</svg></div></div>
  
</div> 


      <h1 className="text-4xl flex ml-28 text-gray-100 font-bold p-12">Events</h1>

      <div className="flex  flex-col justify-center items-center w-full">
        
      <div className="w-5/6 left-28 h-auto flex-row m-3 grid grid-cols-2 gap-10 justify-center rounded-xl p-6 ">
  {events.length > 0 ? (
    events.map((event) => (
      <div
        key={event.event_name}
        className={`w-full h-full transition-all duration-500 ease-in-out ${
          expandedEvent === event.event_name ? 'h-full ' : 'h-72'
        }  p-3 flex flex-col  bg-neutral-700 rounded-2xl mb-9 `}
      >
        <div
          className={`${
            expandedEvent === event.event_name ? 'hidden' : 'flex flex-row w-full h-full'
          }`}
        >
          {/* Left Side */}
          <div className="w-1/2">
            <div className="w-full font-mono mb-7 m-2 rounded-lg">
              <h3 className="text-white text-4xl">{event.event_name}</h3>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full m-1 rounded-lg">
                <div className="text-white flex flex-row items-center">
                <div className="mr-3 w-7 h-7">
                    {/* Time Icon */}
                    <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png"></img>

                  </div>
                  
    {(() => {
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long', // This adds the full day name
        month: 'long',
        day: 'numeric'
      });
      return formattedDate;
    })()}
                </div>
              </div>

              <div className="w-full m-1 rounded-lg">
                <div className="text-white flex flex-row items-center">
                  <div className="mr-3 w-7 h-7">
                    {/* Time Icon */}
                    <img src="https://img.icons8.com/ios11/512/FFFFFF/clock.png"></img>

                  </div>
                  {event.time && typeof event.time === 'string' ? event.time.slice(0, 5) : 'N/A'}
                  </div>
              </div>
            </div>

            <div className="w-full m-1 rounded-lg">
              <div className="text-white flex flex-row items-center">
                <div className="mr-2 w-7 h-7">
                  {/* Location Icon */}
                  <img src="https://cdn2.iconfinder.com/data/icons/social-media-2259/512/google-512.png"></img>
                </div>
                {event.loc}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2 right-0 flex flex-col items-center space-y-4">
            <div className="w-full h-4/5 ">{event.imageBase64 ? (
              <img
                src={`data:image/jpeg;base64,${event.imageBase64}`} // Display image from base64 string
                alt={event.event_name}
                className="event-image"
              />
            ) : (
              <p>No image available</p>
            )}</div>
            <button
              className="bg-yellow-600 text-white rounded-full p-2 flex flex-row hover:scale-105"
              onClick={() => handleViewMore(event.event_name)}
            >
              {expandedEvent === event.event_name ? 'Show Less' : 'View More'}
            </button>
          </div>
        </div>

        {/* Expanded Content in Modal */}
{/* Expanded Content in Modal */}
{expandedEvent !== null && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    onClick={() => setExpandedEvent(null)} // Close the modal when clicking outside
  >
    <div
      className="bg-gray-100 w-11/12 h-1/2 md:w-3/5 rounded-lg p-6 relative overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
    >
      <button
        className="absolute top-2 right-2 bg-red-500 h-7 w-7 text-white rounded-full "
        onClick={() => setExpandedEvent(null)}
      >
        X
      </button>

      <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full bg-transparent">
        {/* Left Section */}
        <div className="overflow-y-auto max-h-[60vh]">
        {event.imageBase64 ? (
              <img
                src={`data:image/jpeg;base64,${event.imageBase64}`} // Display image from base64 string
                alt={event.event_name}
                className="event-image"
              />
            ) : (
              <p>No image available</p>
            )}          <h2 className="text-lg font-semibold m-4 text-black">{expandedEvent}</h2>
          <p className="text-neutral-700 m-4">
            {event.desc}
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="overflow-y-auto max-h-[60vh]">
          <h3 className="mt-4 mb-4 text-lg font-bold">Register</h3>
          <form onSubmit={handleRegistration}>
            <div className="grid grid-cols-1 mr-12">
              <input
                type="text"
                placeholder="Name"
                className="mt-1 input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                value={pname}
                onChange={handlePnameChange}
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                className="mt-1 input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                onChange={handleEmailChange}
                value={email}
              />
              {emailError && <p className="text-red-500 text-sm -mb-2">{emailError}</p>}
              <br />
              <input
                type="tel"
                placeholder="Phone number"
                className="mt-1 input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                onChange={handleMobnoChange}
                value={mobno}
              />
              {phoneError && <p className="text-red-500 -mb-2">{phoneError}</p>}
              <br />
              <input
                type="text"
                placeholder="LinkedIn ID"
                className="input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                value={linkedin}
                onChange={handleLinkedinChange}
              />
              <input type="hidden" name="event_name" value={expandedEvent} />
            </div>
            <button className="bg-black text-white py-2 mt-3 w-64 rounded-lg" type="submit" onClick={triggerConfetti}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}



      </div>
    ))
  ) : (
    <div className="flex justify-center items-center h-20">
       <p className="text-white">Loading events...</p>
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>  )}
</div>

      </div>
        </main>
      </div>
    );
  }

  