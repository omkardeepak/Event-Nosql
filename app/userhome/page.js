"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/navbar';
import { useRouter } from 'next/navigation';

export default function EventsPage() {
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
  router.push(`/discover?username=${encodeURIComponent(username)}`);
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
      // Replace with your actual API or database fetching logic
      const response = await fetch('/api/getEvents'); // Sample API call
      const data = await response.json();
  // "Event registered successfully"
      console.log(data.events);      
      setEvents(data.events);
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

    return (
      <div className="min-h-screen bg-neutral-900 text-darkblue">
        
        <header className="flex justify-between text-white bg-lightblue items-center p-7 border-b  h-20 border-gray-700">
          <nav className="flex space-x-4 ">
            <a href="#" className="text-sm font-medium hover:underline">
              Events
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              Calendars
            </a>
            <button onClick={handleProfile}  className="text-sm font-medium hover:underline">
              Discover
            </button>
          </nav>
          <a href="/">
          <button className="text-sm font-medium">Log out</button>
          </a>
        </header>
        
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







</span><div className='absolute bottom-7'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
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
        }  p-3 flex flex-col  bg-neutral-700 rounded-2xl mb-9`}
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
                <div className="mr-3 w-10 h-10">
                    {/* Time Icon */}
                    <img src="https://img.freepik.com/free-vector/calendar-remider-date-isolated-icon_24877-83379.jpg?semt=ais_hybrid"></img>

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
                <p className="text-white flex flex-row items-center">
                  <div className="mr-3 w-10 h-10">
                    {/* Time Icon */}
                    <img src="https://img.icons8.com/ios11/512/FFFFFF/clock.png"></img>

                  </div>
                  {event.time.slice(0, 5)}
                </p>
              </div>
            </div>

            <div className="w-full m-1 rounded-lg">
              <p className="text-white flex flex-row items-center">
                <div className="mr-2 w-10 h-10">
                  {/* Location Icon */}
                  <img src="https://cdn2.iconfinder.com/data/icons/social-media-2259/512/google-512.png"></img>
                </div>
                {event.loc}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2 right-0 flex flex-col items-center space-y-4">
            <div className="w-full h-4/5 bg-gray-200"></div>
            <button
              className="bg-yellow-600 text-white rounded-full p-2 flex flex-row hover:scale-105"
              onClick={() => handleViewMore(event.event_name)}
            >
              {expandedEvent === event.event_name ? 'Show Less' : 'View More'}
            </button>
          </div>
        </div>

        {/* Expanded Content in Modal */}
        {expandedEvent === event.event_name && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    onClick={() => setExpandedEvent(null)} // Close the modal when clicking outside
  >
    <div
      className="bg-white w-11/12 md:w-3/5 rounded-lg p-6 relative max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
    >
      <button
        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
        onClick={() => setExpandedEvent(null)}
      >
        X
      </button>

      <div className="rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full bg-transparent">
        {/* Left Section */}
        <div className="overflow-y-auto max-h-[60vh]">
          <img className="w-full h-40 object-cover mb-4" alt="Event" />
          <h2 className="text-lg font-semibold m-4 text-black">{event.event_name}</h2>
          <p className="text-neutral-700 m-4">
            Join us for an exciting Hackathon where creativity meets technology! This event
            is designed to bring together tech enthusiasts, developers, and innovators to
            build solutions that can shape the future. Whether you're a beginner or an
            experienced coder, this Hackathon is the perfect platform to showcase your
            skills.
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
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="mt-1 input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                  onChange={handleEmailChange}
                  value={email}
                />
                {emailError && <p className="text-red-500 text-sm -mb-2">{emailError}</p>}
              </div>
              <br />
              <div className="mb-7">
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="mt-1 input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                  onChange={handleMobnoChange}
                  value={mobno}
                />
                {phoneError && <p className="text-red-500 -mb-2">{phoneError}</p>}
              </div>
              <input
                type="text"
                placeholder="LinkedIn ID"
                className="input-field bg-gray-100 rounded-lg h-8 text-black px-3 w-full"
                value={linkedin}
                onChange={handleLinkedinChange}
              />
              <input type="hidden" name="event_name" value={event.event_name} />
            </div>
            <button className="bg-black text-white py-2 mt-3 w-64 rounded-lg" type="submit">
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
    <p>No events available at the moment.</p>
  )}
</div>

      </div>
        </main>
      </div>
    );
  }

  