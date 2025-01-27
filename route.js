import pool from "@/lib/db";

export async function POST(req) {
  // Extract data from the request body
  const { username, email, password } = await req.json(); // Since POST data is usually in the body

  // Insert data into the database
  try {
    const result = await pool.query(
      'INSERT INTO host_data (username, email, password) VALUES ($1, $2, $3)',
      [username, email, password]
    );

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
      JSON.stringify({ message: 'Error registering user', error: error.message }),
      {
        status: 500,
      }
    );
  }
}
