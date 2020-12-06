const express = require('express');
const app = express();
const fetch = require('node-fetch');

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

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
