import pool from "@/lib/db";

export async function POST(req) {
  var pass='';
  var name='';
  var mail='';
  // Extract data from the request body
  const { username, email, password ,isLogin } = await req.json(); // Since POST data is usually in the body


  // Insert data into the database
  try {
    if(isLogin==true){
      if ( !email || !password) {
        return new Response(
          JSON.stringify({ message: 'All fields are required'}),
          {
            status: 500,
          }
        );
      }
      else{
      
        const result = await pool.query(
            'SELECT * FROM host_data',[]
          );
          
      
          // Get the newly created user (optional)
           result.rows.forEach(async (detail) => {
              if (detail.email_id ==email ) {
                  pass=detail.password;
                  name=detail.host_name;
              }}) 
              if(pass==password){
                return new Response(
              
                  JSON.stringify({ message: 'Successfully logged in' ,hostname:name}),
                  {
                    status: 201,
                  }
                );// Respond with success message      
      }

      else{
        return new Response(
              
          JSON.stringify({ message: 'Incorrect email or password' }),
          {
            status: 500,
          }
        );// 
      }
    }
    }
    else{
      if (!username || !email || !password) {
        return new Response(
          JSON.stringify({ message: 'All fields are required'}),
          {
            status: 500,
          }
        );
      }
      else{
    const result = await pool.query(
      'INSERT INTO host_data (host_name, email_id, password) VALUES ($1, $2, $3)',
      [username, email, password] 
    );
    return new Response(
              
      JSON.stringify({ message: 'Registered successfully.',hostname:username }),
      {
        status: 201,
      }
    );// 
  }

  }

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
