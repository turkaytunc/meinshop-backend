import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chalk from 'chalk';
import productRoutes from './routes/productRoutes.js';
import {
  errorHandler,
  notFoundErrorHandler,
} from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();

const { PORT = 5000, NODE_ENV } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/products', productRoutes);

// Error handlers

app.use(notFoundErrorHandler);

app.use(errorHandler);

connectDB().then(
  app.listen(PORT, () => {
    console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
  })
);
