import fetch from 'node-fetch';
import express from 'express';

import Product from '../models/productModel.js';
import chalk from 'chalk';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    console.error(chalk.red.bgRedBright('Cant fetch products from db'));
    res.status(404);
    next(new Error('Cant get products!'));
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    console.error(
      chalk.red.bgBlackBright('Cant fetch product with given id from db')
    );
    res.status(404);
    next(new Error('Product not found!'));
  }
});

export default router;
