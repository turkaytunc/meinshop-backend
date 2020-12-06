import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongo connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
