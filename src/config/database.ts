import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
   
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    connected = true;

  } catch (err) {
   return {message: "error"}
  }
};

export default connectDB;
