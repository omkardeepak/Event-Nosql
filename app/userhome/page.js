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
    };
  
    const handleMobnoChange = (e) => {
      setMobno(e.target.value);
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
      <div className="min-h-screen bg-cream text-darkblue">
        
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
        
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-4">Events</h1>
  
          <div className="h-44  w-full flex justify-center items-center text-7xl font-mono  text-darkblue">
      <h1>Welcome, {username}!</h1>      
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-1/2 left-28 h-auto flex-row m-3 justify-center rounded-xl p-6 ">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.event_name}
                className={`w-full transition-all duration-500 ease-in-out ${
                  expandedEvent === event.event_name ? 'h-96' : 'h-60'
                }  p-3 flex flex-col  border-2 bg-[#438478] rounded-2xl mb-9`}
              >
                <div className={`  ${
                  expandedEvent === event.event_name ? 'hidden' : 'flex flex-row w-full h-full'
                }  `}>
                {/* Left Side */}
                <div className="w-1/2">
                  <div className="w-full font-mono mb-7 m-2 rounded-lg">
                    <h3 className="text-white text-4xl">{event.event_name}</h3>
                  </div>

                  <div className="w-full flex flex-row">
                    <div className="w-full m-1 rounded-lg">
                      <div className="text-white flex flex-row items-center">
                        <div className="mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-calendar-event"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                          </svg>
                        </div>
                        {event.date.split('T')[0]}
                      </div>
                    </div>

                    <div className="w-full m-1 rounded-lg">
                      <p className="text-white flex flex-row items-center">
                        <div className="mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-alarm"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                          </svg>
                        </div>
                        {event.time.slice(0, 5)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full m-1 rounded-lg">
                    <p className="text-white flex flex-row items-center">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-geo-alt-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>
                      </div>
                      {event.loc}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="w-1/2 right-0 flex flex-col items-center space-y-4">
                  <div className="w-full h-3/4 bg-gray-200"></div>
                  <button
                    className="bg-red-600 text-white rounded-full p-2 flex flex-row hover:scale-105"
                    onClick={() => handleViewMore(event.event_name)}
                  >
                    {expandedEvent === event.event_name ? 'Show Less' : 'View More'}
                    <div className="flex items-center ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 1 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
                </div>

                {/* Expanded Content */}
                {expandedEvent === event.event_name && (
                  <div className='h-full w-full flex justify-center items-center flex-col'>
                  
                    <div  className="rounded-lg  grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full  bg-transparent">
                              {/* Left Section */}
                              <div>
                                {/* <Image 
                                  src="/download.jpg" // Ensure this image exists in your public folder
                                  alt="Outdoor Delicacy"
                                  width={400}
                                  height={200}
                                  className="rounded-lg m-4"
                                /> */}
                                <h2 className="text-lg font-semibold m-4 text-white">Event Name</h2>
                                <p className="text-neutral-100 m-4">
                                  Join us for an exciting Hackathon where creativity meets technology! This event is designed to bring together tech enthusiasts, developers, and innovators to build solutions that can shape the future. Whether you're a beginner or an experienced coder, this Hackathon is the perfect platform to showcase your skills, collaborate with like-minded individuals.
                                </p>
                               
                              </div>
                    
                              {/* Right Section - Form */}
                              <div >
                                <h3 className="mt-4 mb-4 text-lg font-bold">Register</h3>
                                <form onSubmit={handleRegistration}>
                                <div className=" grid grid-cols-1 mr-12 ">
                                  <input type="text" placeholder="Name" className="mt-1 input-field bg-black placeholder-white bg-opacity-35 rounded-lg h-8 text-white px-3 w-full " value={pname} onChange={handlePnameChange} /><br></br>
                                  <input type="email" placeholder="Email address" className="-mt-2 input-field bg-black placeholder-white bg-opacity-35 rounded-lg h-8 text-white px-3 w-full " value={email}  onChange={handleEmailChange}/><br></br>
                                  <input type="text" placeholder="Mob. no" className="-mt-2 input-field bg-black placeholder-white bg-opacity-35 rounded-lg h-8 text-white px-3 w-full " value={mobno} onChange={handleMobnoChange}/><br></br>
                                  <input type="text" placeholder="Linkedin ID" className="-mt-2 input-field bg-black placeholder-white bg-opacity-35 rounded-lg h-8 text-white px-3 w-full " value={linkedin} onChange={handleLinkedinChange}/>
                                  <input
        type="hidden"
        name="event_name"
        value={event.event_name}
      />
                    
                                </div>
                                <button className=" bg-black text-white py-2 mt-6 w-64 rounded-lg" type='submit'>Register</button>

                                </form>
                    
                                {/* <h3 className="text-lg font-semibold mt-6">Payment details</h3> */}
                                
                    
                              </div>
                            </div>
                    
                  
                  <button
                    className="bg-red-600 text-white rounded-full w-32 p-2 flex flex-row hover:scale-105"
                    onClick={() => handleViewMore(event.event_name)}
                  >
                    {expandedEvent === event.event_name ? 'Show Less' : 'View More'}
                    <div className="flex items-center ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 1 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                        />
                      </svg>
                    </div>
                  </button>
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

  