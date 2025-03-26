import pool from "@/lib/db";

export async function GET(req) {
    // Extract the username from the query parameters
    const { searchParams } = new URL(req.url); // Get URL params
    const hostname = searchParams.get('hostname'); // Extract the 'username' parameter
  
    // If no username was provided, handle accordingly
    if (!hostname) {
      return new Response(JSON.stringify({ error: 'Username is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  
    try {
      // Query database with the extracted username
      const result = await pool.query(
        `SELECT u.name, e.event_name, u.email_address, u.mobile_number 
FROM events e
INNER JOIN participants u
ON u.event_name = e.event_name
WHERE e.hostname = $1;`,
        [hostname] // Use the username in the query
      );
      // console.log(result.rows);

      // Return the result as JSON
      console.log(result)
      return new Response(JSON.stringify(result.rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  
  
  
  
  