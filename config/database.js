import chalk from 'chalk';
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
    console.log(
      chalk.magenta(`Mongo connected: ${connection.connection.host}`)
    );
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
};

export default connectDB;
