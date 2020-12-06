import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chalk from 'chalk';
import productRoutes from './routes/productRoutes.js';

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

app.use((req, res, next) => {
  res.status(404);
  next(new Error('Page Not Found'));
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
});

connectDB().then(
  app.listen(PORT, () => {
    console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
  })
);
