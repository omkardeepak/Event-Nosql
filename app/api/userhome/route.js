import pool from "@/lib/db";
const nodemailer = require('nodemailer');



export async function POST(req) {
  // Extract data from the request body
  const { pname, email, mobno, linkedin, event } = await req.json(); // Since POST data is usually in the body

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
      user: 'omkardeepak777@gmail.com',
      pass: 'vssw msit ahbr wevd' // or app-specific password if using 2FA
    }
  });

  if (!pname || !email || !mobno) {
    return new Response(
      JSON.stringify({ message: 'All fields are required'}),
      {
        status: 500,
      }
    );
  }

  try {
    console.log(event);
  
    // First query to insert participant details
    const result = await pool.query(
      'INSERT INTO participants (name, email_address, mobile_number, linkedin_id , event_name) VALUES ($1, $2, $3, $4, $5)',
      [pname, email, mobno, linkedin, event]
    );
  
    // Second query to fetch event details (e.g., event date and location)
    const eventDetails = await pool.query(
      'SELECT * FROM events WHERE event_name = $1',
      [event]
    );
  
    // Extract event details
    const { event_name,date,time, loc,des,hostname } = eventDetails.rows[0];
  
    // Mail options using fetched event details
    const mailOptions = {
      from: 'omkardeepak777@gmail.com',
      to: email,
      subject: `Registration Confirmation for ${event}`,
      html: `
        <h1>Get Ready! 🎉 You’re Invited to ${event}</h1>
        <p>Guess what?! We’re throwing an amazing event, and you’re officially on the cool people list (it’s exclusive, trust us 😉). We’re talking about ${event} a flagship ${des} Happening on ${date.toDateString()}. Mark your calendar, because you won’t want to miss this!</p>
        <br></br>
        <p>Event: <strong>${event}</strong></p>
        <p>Date: ${date.toDateString()}</p>
        <p>Time: ${time}</p>
        <p>Location: ${loc}</p>
        <p> 🎟 We look forward to seeing you there!</p>
      `
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  
   
  

    // Get the newly created user (optional)

    // Respond with success message
    return new Response(
      JSON.stringify({ message: 'User registered successfully'}),
      {
        status: 201,
      }
    );
  } catch (error) {
    // Handle any errors
    return new Response(
      JSON.stringify({ message: 'Database Error', error: error.message }),
      {
        status: 500,
      }
    );
  }

// console.log(pname);
// console.log(email);
// console.log(mobno);
// console.log(linkedin);



}
