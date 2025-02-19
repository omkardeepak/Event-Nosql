import pool from "@/lib/db";

export async function GET(req) {
  // Extract data from the request body
 // Since POST data is usually in the body

  // Insert data into the database
  try {
    const result = await pool.query(
      'SELECT * FROM events',
      [] 
    );
    

    // Get the newly created user (optional)

    // Respond with success message
    return new Response(
      JSON.stringify({ events: result.rows }),
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
