import mongoose from "mongoose";

const DBconnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.log("❌ Database connection error:", error);
    process.exit(1);
  }
};

export default DBconnect;
