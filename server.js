import express from 'express';
import fetch from 'node-fetch';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chalk from 'chalk';

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

app.get('/api/products', (req, res) => {
  fetch('https://fakestoreapi.com/products')
    .then((data) => data.json())
    .then((parsedData) => res.json(parsedData));
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id) || null;

  if (id != null) {
    return fetch(`https://fakestoreapi.com/products/${id}`)
      .then((data) => data.json())
      .then((parsedData) => {
        if (parsedData) {
          res.json(parsedData);
        } else {
          res.status(404).send('Cant find item');
        }
      });
  }
  return res.status(500).send('Server Error');
});

connectDB().then(
  app.listen(PORT, () => {
    console.log(chalk.magenta(`Server running on http://localhost:${PORT}`));
  })
);
