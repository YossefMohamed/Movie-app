import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongoDB"))
    .catch((e) => console.log(e.message));
};

export default connectDB;
