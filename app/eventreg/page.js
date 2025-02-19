"use client"
import Image from "next/image";

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-black via-slate-900 to-emerald-500 flex justify-center items-center">
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-4xl w-full bg-gradient-to-t from-black via-slate-900 to-emerald-500">
        <header className="flex justify-between items-center pb-4 border-b">
          <h1 className="text-xl font-semibold ">You are almost done!</h1>
        </header>

        <div  className="rounded-lg m-10 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 bg-gradient-to-t from-black via-slate-900 to-emerald-500 ">
          {/* Left Section */}
          <div>
            <Image 
              src="/download.jpg" // Ensure this image exists in your public folder
              alt="Outdoor Delicacy"
              width={400}
              height={200}
              className="rounded-lg m-4"
            />
            <h2 className="text-lg font-semibold m-4">Event Name</h2>
            <p className="text-gray-600 m-4">
              The extra space enables you to double your seating and provides a unique dining experience.
            </p>
           
          </div>

          {/* Right Section - Form */}
          <div>
            <h3 className="mt-4 text-lg font-bold">Dinner details</h3>
            <div className=" grid grid-cols-2 gap-4 mt-2 w-96">
              <input type="text" placeholder="Name" className="mt-4 input-field " /><br></br>
              <input type="email" placeholder="Email address" className="input-field" /><br></br>
              <input type="text" placeholder="Mob. no" className="input-field" /><br></br>
              <input type="text" placeholder="Linkedin ID" className="input-field" />

            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Payment details</h3> */}
            

            <button className="w-60 bg-black text-white py-2 mt-6 rounded-lg">Request Booking</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 6px;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
