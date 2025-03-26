import { connectToDatabase } from '../../../lib/mongo'; // Correct the path based on your structure

export async function GET(req) {
  try {
    // Extract 'hostname' from the query parameters
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const hostname = searchParams.get('hostname');

    if (!hostname) {
      return new Response(JSON.stringify({ error: 'Host name is required' }), { status: 400 });
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch feedback based on host name from the 'feedback' collection
    const feedbacks = await db.collection('feedback').find({ hostName: hostname }).toArray();

    if (feedbacks.length === 0) {
      return new Response(JSON.stringify({ error: 'No feedback found for this host' }), { status: 404 });
    }

    // Return the feedback entries as a JSON response
    return new Response(JSON.stringify(feedbacks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch feedback' }), { status: 500 });
  }
}
