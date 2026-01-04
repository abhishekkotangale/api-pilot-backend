import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("mongo url", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("error occured while connecting db")
    console.error(err);
  }
};

export default connectDB;