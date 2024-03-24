import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Connect");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    connected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
