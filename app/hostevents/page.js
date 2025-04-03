"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DiscoverPage = () => {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const searchParams = useSearchParams();
  const hostname = searchParams.get('hostname');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(`/api/hostevents?hostname=${hostname}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    if (hostname) {
      fetchEvents();
    }
  }, [hostname]);

  const handleEdit = (event) => {
    setEditingEventId(event.id);
    setEditedData({ ...event });
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`/api/updateevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editedData })
      });
      if (response.ok) {
        setEvents(events.map(event => (event.id === id ? editedData : event)));
        setEditingEventId(null);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className='bg-neutral-200 h-screen w-full'>
      <nav className="bg-gray-800 text-gray-300 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-gray-200 text-lg">✦</span>
          <button onClick={() => router.push(`/hosthome?hostname=${hostname}`)}>Home</button>
          <button onClick={() => router.push(`/hostfeedback?hostname=${hostname}`)}>Feedback</button>
          <button onClick={() => router.push(`/discoverhost?hostname=${hostname}`)}>Discover</button>
          <button >View Events</button>

        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">{currentTime}</span>
          <div className="w-8 h-8 bg-green-300 rounded-full"></div>
        </div>
      </nav>
      
      <div className='bg-neutral-200 rounded-lg shadow-lg min-h-screen w-full'>
        <div className='flex flex-col items-center'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt='User avatar'
            className='w-24 h-24 rounded-full shadow-md mb-2'
          />
          <h2 className='text-2xl font-bold text-gray-900'>{hostname}</h2>
          <h3 className="text-gray-900 text-3xl mt-12">Registered Events:</h3>

          <div className='mt-8 w-1/2 px-4'>
            {events.length > 0 ? (
              <ul className='space-y-4'>
                {events.map((event) => (
                  <li key={event.id} className='bg-darkblue pl-7 text-white p-4 rounded-lg shadow'>
                    {editingEventId === event.id ? (
                      <div>
                        <input
                          className='text-2xl text-black mb-2 w-full'
                          value={editedData.event_name || ''}
                          onChange={(e) => handleChange(e, 'event_name')}
                        />
                        <input
                          type="date"
                          className='text-black mb-2 w-full'
                          value={editedData.date || ''}
                          onChange={(e) => handleChange(e, 'date')}
                        />
                        <input
                          type="time"
                          className='text-black mb-2 w-full'
                          value={editedData.time || ''}
                          onChange={(e) => handleChange(e, 'time')}
                        />
                        <input
                          className='text-black mb-2 w-full'
                          value={editedData.loc || ''}
                          onChange={(e) => handleChange(e, 'loc')}
                        />
                        <textarea
                          className='text-black mb-2 w-full'
                          value={editedData.des || ''}
                          onChange={(e) => handleChange(e, 'des')}
                        />
                        <button onClick={() => handleSave(event.id)} className='bg-green-500 px-4 py-2 rounded text-white'>Save</button>
                        <button onClick={() => setEditingEventId(null)} className='bg-red-500 px-4 py-2 ml-2 rounded text-white'>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <h1 className='text-4xl'>{event.event_name}</h1>
                        <p className='text-lg'>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                        <p>{event.time.slice(0, 5)}</p>
                        <p>{event.loc}</p>
                        <p>{event.des}</p>
                        <button onClick={() => handleEdit(event)} className='bg-blue-500 px-4 py-2 rounded text-white'>Edit</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-black'>No events found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
