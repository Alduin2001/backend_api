import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
async function connectionDB() {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize:10
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('Disconnected');
  }
}

export default connectionDB;