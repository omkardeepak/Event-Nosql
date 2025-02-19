"use client"

export default function Navbar(){
    return (
        <header className="flex justify-between items-center p-7 border-b  h-20 border-gray-700">
          <nav className="flex space-x-4">
            <a href="#" className="text-sm font-medium hover:underline">
              Events
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              Calendars
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              Discover
            </a>
          </nav>
          <a href="/">
          <button className="text-sm font-medium">Log out</button>
          </a>
        </header>
    )
}