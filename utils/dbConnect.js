import mongoose from "mongoose";

const connection = {};

export default async function dbConnect() {
  if (connection.connected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;

  console.log(connection.isConnected);
}