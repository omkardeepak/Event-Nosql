import pool from "@/lib/db";

export async function POST(req) {
  // Extract data from the request body
  const { pname, email, mobno, linkedin, event } = await req.json(); // Since POST data is usually in the body
  if (!pname || !email || !mobno) {
    return new Response(
      JSON.stringify({ message: 'All fields are required'}),
      {
        status: 500,
      }
    );
  }

  try {
    console.log(event)
    const result = await pool.query(
      'INSERT INTO participants (name, email_address, mobile_number, linkedin_id , event) VALUES ($1, $2, $3, $4, $5)',
      [pname, email, mobno, linkedin, event] 
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
