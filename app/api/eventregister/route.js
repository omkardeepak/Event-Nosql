import pool from "@/lib/db";

export async function POST(req) {
  // Extract data from the request body
  const { name,date,time,loc,desc,hostname } = await req.json(); // Since POST data is usually in the body

  // Insert data into the database
  try {
    const result = await pool.query(
      'INSERT INTO events (event_name, date, time, loc ,des,hostname) VALUES ($1, $2, $3, $4, $5, $6)',
      [name,date,time,loc,desc,hostname] 
    );
    

    // Get the newly created user (optional)

    // Respond with success message
    return new Response(
      JSON.stringify({ message: 'Event registered successfully'}),
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
}
