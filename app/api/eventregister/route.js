import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongo";
import pool from "@/lib/db"; // PostgreSQL connection

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const date = formData.get("date");
    const time = formData.get("time");
    const loc = formData.get("loc");
    const desc = formData.get("desc");
    const hostname = formData.get("hostname");

    const imageFile = formData.get("image");
    let imageBuffer = null;

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const mongoInsert = db.collection("events").insertOne({
      event_name: name,
      date,
      time,
      loc,
      desc,
      hostname,
      image: imageBuffer,
      createdAt: new Date(),
    });

    // Insert into PostgreSQL (without image)
    const postgresInsert = pool.query(
      "INSERT INTO events (event_name, date, time, loc, des, hostname) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, date, time, loc, desc, hostname]
    );

    // Run both inserts in parallel
    await Promise.all([mongoInsert, postgresInsert]);

    return NextResponse.json({ message: "Event registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Database Error", error: error.message }, { status: 500 });
  }
}
