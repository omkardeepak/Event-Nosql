import { connectToDatabase } from '../../../lib/mongo';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, hostName, eventName, feedback, rating } = body;

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();

    // Insert the feedback into the 'feedbacks' collection
    const result = await db.collection('feedback').insertOne({
      username,
      hostName,
      eventName,
      feedback,
      rating,
    });

    // Return a successful response
    return new Response(JSON.stringify({ message: 'Feedback submitted successfully!', insertedId: result.insertedId }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return new Response(JSON.stringify({ message: 'Error submitting feedback', error }), {
      status: 500,
    });
  }
}
