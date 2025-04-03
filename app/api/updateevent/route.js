import { ObjectId } from 'mongodb';
import pool from '../../../lib/db';
import { connectToDatabase } from '../../../lib/mongo';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, event_name, date, time, loc, des } = body;
    const desc=des;
    if ( !event_name || !date || !time || !loc || !des) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const { db } = await connectToDatabase("feedback");
    const eventsCollection = db.collection('events');

    const mongoResult = await eventsCollection.updateOne(
        { event_name: event_name },
        { $set: { date, time, loc, desc } }
      );

    const pgClient = await pool.connect();
    const pgResult = await pgClient.query(
      'UPDATE events SET  date = $1, time = $2, loc = $3, des = $4 WHERE event_name = $5',
      [ date, time, loc, des, event_name]
    );
    pgClient.release();

    if (mongoResult.modifiedCount === 0 && pgResult.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Event not found or no changes made in both databases' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Event updated successfully in both databases' }), { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}