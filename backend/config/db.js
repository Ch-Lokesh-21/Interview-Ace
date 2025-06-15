const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGO_URI, {});
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};
module.exports = connectDB;