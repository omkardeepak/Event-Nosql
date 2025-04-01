import { connectToDatabase } from '../../../lib/mongo'; // Correct the path based on your structure

export async function GET(req) {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch all events from the 'events' collection
    const events = await db.collection('events').find().toArray();

    if (events.length === 0) {
      return new Response(JSON.stringify({ error: 'No events found' }), { status: 404 });
    }

    // Map events to include the image as base64
    const eventsWithImages = events.map(event => {
      let imageBase64 = null;

      if (event.image) {
        // Convert image buffer to base64 string
        imageBase64 = event.image.toString('base64');
      }

      return {
        ...event,
        imageBase64,  // Include the image as base64
      };
    });

    // Return the events details with images as a JSON response
    return new Response(JSON.stringify({ events: eventsWithImages }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
  }
}
