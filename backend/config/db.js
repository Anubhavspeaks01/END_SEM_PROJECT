const mongoose = require('mongoose');

/**
 * Connects to MongoDB asynchronously using mongoose.
 * Exits the process with failure code if connection fails.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+ automatically handles useNewUrlParser, useUnifiedTopology, etc.
      // But we wrap in a try-catch to properly log the connection host.
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
