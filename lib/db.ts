import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGO_URI).then(() => mongoose);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connectToDB;
