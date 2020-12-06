import fetch from 'node-fetch';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  fetch('https://fakestoreapi.com/products')
    .then((data) => data.json())
    .then((parsedData) => res.json(parsedData));
});

router.get('/:id', (req, res) => {
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

export default router;
