import fetch from 'node-fetch';
import express from 'express';

import Product from '../models/productModel.js';
import chalk from 'chalk';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(chalk.red.bgRedBright('Cant fetch products from db'));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.error(
      chalk.red.bgRedBright('Cant fetch product with given id from db')
    );
    res.status(500);
  }
});

export default router;
