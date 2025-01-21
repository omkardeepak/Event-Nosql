import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center object-contain">
     <div className="z-0 w-full h-full inset-0 absolute">
  <Image 
    className="object-cover" 
    src="/bg.jpg" 
    alt="Background" 
    layout="fill" 
  />
  
</div>

      <h1 className="text-3xl font-bold mb-8 z-10 text-white">Event Management</h1>
      <div className="z-10 flex flex-col sm:flex-row justify-center w-full max-w-4xl rounded-2xl shadow-2xl">
        
        {/* Host Section with Background Color */}
        <div className="w-full sm:w-1/2 p-8 bg-white rounded-t-xl sm:rounded-t-none bg-opacity-30 sm:rounded-l-2xl">
          <h2 className="text-xl font-semibold mb-4">Host</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Login as Host
            </button>
          </form>
        </div>

        {/* User Section with Background Color */}
        <div className="w-full sm:w-1/2 p-8 bg-blue-100 rounded-b-xl sm:rounded-b-none bg-opacity-30 sm:rounded-r-xl">
          <h2 className="text-xl font-semibold mb-4">User</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login as User
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

